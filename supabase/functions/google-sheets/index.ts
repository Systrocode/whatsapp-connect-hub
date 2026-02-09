import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GOOGLE_CLIENT_ID = Deno.env.get("GOOGLE_CLIENT_ID")!;
const GOOGLE_CLIENT_SECRET = Deno.env.get("GOOGLE_CLIENT_SECRET")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

const REDIRECT_URI = `${SUPABASE_URL}/functions/v1/google-sheets/callback`;
const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets.readonly",
  "https://www.googleapis.com/auth/drive.readonly",
].join(" ");

// Create Supabase admin client
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function getUserFromToken(authHeader: string | null) {
  if (!authHeader) {
    console.log("No authorization header provided");
    return null;
  }
  
  const token = authHeader.replace("Bearer ", "");
  if (!token) {
    console.log("No token in authorization header");
    return null;
  }

  // Use admin client to get user from JWT token
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  if (error) {
    console.error("Error verifying token:", error);
    return null;
  }
  return user;
}

// Exchange authorization code for tokens
async function exchangeCodeForTokens(code: string) {
  console.log("Exchanging code for tokens...");
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Token exchange error:", errorText);
    throw new Error(`Token exchange failed: ${errorText}`);
  }

  return response.json();
}

// Refresh access token
async function refreshAccessToken(refreshToken: string) {
  console.log("Refreshing access token...");
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      grant_type: "refresh_token",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Token refresh error:", errorText);
    throw new Error(`Token refresh failed: ${errorText}`);
  }

  return response.json();
}

// Store tokens in database
async function storeTokens(userId: string, tokens: { access_token: string; refresh_token?: string; expires_in: number }) {
  const expiresAt = new Date(Date.now() + tokens.expires_in * 1000);
  
  console.log(`Storing tokens for user ${userId}, expires at ${expiresAt.toISOString()}`);
  
  const { error } = await supabaseAdmin
    .from("google_oauth_tokens")
    .upsert({
      user_id: userId,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: expiresAt.toISOString(),
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });

  if (error) {
    console.error("Error storing tokens:", error);
    throw error;
  }
}

// Get valid access token (refresh if needed)
async function getValidAccessToken(userId: string): Promise<string | null> {
  const { data: tokenData, error } = await supabaseAdmin
    .from("google_oauth_tokens")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error || !tokenData) {
    console.log("No tokens found for user:", userId);
    return null;
  }

  const expiresAt = new Date(tokenData.expires_at);
  const now = new Date();
  
  // If token expires within 5 minutes, refresh it
  if (expiresAt.getTime() - now.getTime() < 5 * 60 * 1000) {
    console.log("Token expired or expiring soon, refreshing...");
    if (!tokenData.refresh_token) {
      console.log("No refresh token available");
      return null;
    }

    try {
      const newTokens = await refreshAccessToken(tokenData.refresh_token);
      await storeTokens(userId, {
        access_token: newTokens.access_token,
        refresh_token: newTokens.refresh_token || tokenData.refresh_token,
        expires_in: newTokens.expires_in,
      });
      return newTokens.access_token;
    } catch (err) {
      console.error("Failed to refresh token:", err);
      // Delete invalid tokens
      await supabaseAdmin.from("google_oauth_tokens").delete().eq("user_id", userId);
      return null;
    }
  }

  return tokenData.access_token;
}

// List user's spreadsheets
async function listSpreadsheets(accessToken: string) {
  console.log("Fetching user's spreadsheets...");
  const response = await fetch(
    "https://www.googleapis.com/drive/v3/files?q=mimeType='application/vnd.google-apps.spreadsheet'&fields=files(id,name,modifiedTime)&orderBy=modifiedTime desc&pageSize=50",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error listing spreadsheets:", errorText);
    throw new Error(`Failed to list spreadsheets: ${errorText}`);
  }

  const data = await response.json();
  console.log(`Found ${data.files?.length || 0} spreadsheets`);
  return data.files || [];
}

// Get sheet names within a spreadsheet
async function getSheetNames(accessToken: string, spreadsheetId: string) {
  console.log(`Fetching sheets for spreadsheet ${spreadsheetId}...`);
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=sheets.properties`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error getting sheet names:", errorText);
    throw new Error(`Failed to get sheet names: ${errorText}`);
  }

  const data = await response.json();
  const sheets = data.sheets?.map((s: { properties: { sheetId: number; title: string } }) => ({
    id: s.properties.sheetId,
    title: s.properties.title,
  })) || [];
  
  console.log(`Found ${sheets.length} sheets`);
  return sheets;
}

// Get sheet data
async function getSheetData(accessToken: string, spreadsheetId: string, sheetName: string, maxRows: number = 1000) {
  console.log(`Fetching data from ${sheetName} in spreadsheet ${spreadsheetId}...`);
  const encodedSheetName = encodeURIComponent(sheetName);
  const range = `${encodedSheetName}!A1:Z${maxRows}`;
  
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error getting sheet data:", errorText);
    throw new Error(`Failed to get sheet data: ${errorText}`);
  }

  const data = await response.json();
  const values = data.values || [];
  
  if (values.length === 0) {
    return { headers: [], rows: [], totalRows: 0 };
  }

  const headers = values[0] as string[];
  const rows = values.slice(1) as string[][];
  
  console.log(`Retrieved ${rows.length} rows with ${headers.length} columns`);
  
  return {
    headers,
    rows,
    totalRows: rows.length,
  };
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const path = url.pathname.replace("/google-sheets", "").replace("/functions/v1", "");
  
  console.log(`Request: ${req.method} ${path}`);

  try {
    // GET /auth - Initiate OAuth flow
    if (path === "/auth" && req.method === "GET") {
      const authHeader = req.headers.get("authorization");
      const user = await getUserFromToken(authHeader);
      
      if (!user) {
        return new Response(
          JSON.stringify({ error: "Unauthorized" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Create state with user ID for callback
      const state = btoa(JSON.stringify({ userId: user.id }));
      
      const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
      authUrl.searchParams.set("client_id", GOOGLE_CLIENT_ID);
      authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
      authUrl.searchParams.set("response_type", "code");
      authUrl.searchParams.set("scope", SCOPES);
      authUrl.searchParams.set("access_type", "offline");
      authUrl.searchParams.set("prompt", "consent");
      authUrl.searchParams.set("state", state);

      console.log("Generated auth URL for user:", user.id);
      
      return new Response(
        JSON.stringify({ authUrl: authUrl.toString() }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // GET /callback - Handle OAuth callback
    if (path === "/callback" && req.method === "GET") {
      const code = url.searchParams.get("code");
      const state = url.searchParams.get("state");
      const error = url.searchParams.get("error");

      if (error) {
        console.error("OAuth error:", error);
        return new Response(
          `<html><body><script>window.opener?.postMessage({type:'google-sheets-error',error:'${error}'},'*');window.close();</script>OAuth error: ${error}</body></html>`,
          { headers: { "Content-Type": "text/html" } }
        );
      }

      if (!code || !state) {
        return new Response(
          `<html><body><script>window.opener?.postMessage({type:'google-sheets-error',error:'Missing code or state'},'*');window.close();</script>Missing code or state</body></html>`,
          { headers: { "Content-Type": "text/html" } }
        );
      }

      let userId: string;
      try {
        const stateData = JSON.parse(atob(state));
        userId = stateData.userId;
      } catch {
        return new Response(
          `<html><body><script>window.opener?.postMessage({type:'google-sheets-error',error:'Invalid state'},'*');window.close();</script>Invalid state</body></html>`,
          { headers: { "Content-Type": "text/html" } }
        );
      }

      console.log("Processing callback for user:", userId);

      try {
        const tokens = await exchangeCodeForTokens(code);
        await storeTokens(userId, tokens);
        
        console.log("Successfully stored tokens, sending success message");
        
        return new Response(
          `<html><body><script>window.opener?.postMessage({type:'google-sheets-success'},'*');window.close();</script>Success! You can close this window.</body></html>`,
          { headers: { "Content-Type": "text/html" } }
        );
      } catch (err) {
        console.error("Callback error:", err);
        return new Response(
          `<html><body><script>window.opener?.postMessage({type:'google-sheets-error',error:'${(err as Error).message}'},'*');window.close();</script>Error: ${(err as Error).message}</body></html>`,
          { headers: { "Content-Type": "text/html" } }
        );
      }
    }

    // GET /status - Check if user is connected
    if (path === "/status" && req.method === "GET") {
      const authHeader = req.headers.get("authorization");
      const user = await getUserFromToken(authHeader);
      
      if (!user) {
        return new Response(
          JSON.stringify({ error: "Unauthorized" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const accessToken = await getValidAccessToken(user.id);
      
      return new Response(
        JSON.stringify({ connected: !!accessToken }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // POST /disconnect - Disconnect Google account
    if (path === "/disconnect" && req.method === "POST") {
      const authHeader = req.headers.get("authorization");
      const user = await getUserFromToken(authHeader);
      
      if (!user) {
        return new Response(
          JSON.stringify({ error: "Unauthorized" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      await supabaseAdmin.from("google_oauth_tokens").delete().eq("user_id", user.id);
      
      console.log("Disconnected Google account for user:", user.id);
      
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // GET /spreadsheets - List user's spreadsheets
    if (path === "/spreadsheets" && req.method === "GET") {
      const authHeader = req.headers.get("authorization");
      const user = await getUserFromToken(authHeader);
      
      if (!user) {
        return new Response(
          JSON.stringify({ error: "Unauthorized" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const accessToken = await getValidAccessToken(user.id);
      if (!accessToken) {
        return new Response(
          JSON.stringify({ error: "Not connected to Google", code: "NOT_CONNECTED" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const spreadsheets = await listSpreadsheets(accessToken);
      
      return new Response(
        JSON.stringify({ spreadsheets }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // GET /sheets/:spreadsheetId - Get sheet names
    if (path.startsWith("/sheets/") && req.method === "GET") {
      const authHeader = req.headers.get("authorization");
      const user = await getUserFromToken(authHeader);
      
      if (!user) {
        return new Response(
          JSON.stringify({ error: "Unauthorized" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const spreadsheetId = path.replace("/sheets/", "");
      
      const accessToken = await getValidAccessToken(user.id);
      if (!accessToken) {
        return new Response(
          JSON.stringify({ error: "Not connected to Google", code: "NOT_CONNECTED" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const sheets = await getSheetNames(accessToken, spreadsheetId);
      
      return new Response(
        JSON.stringify({ sheets }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // GET /data/:spreadsheetId/:sheetName - Get sheet data
    if (path.startsWith("/data/") && req.method === "GET") {
      const authHeader = req.headers.get("authorization");
      const user = await getUserFromToken(authHeader);
      
      if (!user) {
        return new Response(
          JSON.stringify({ error: "Unauthorized" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const pathParts = path.replace("/data/", "").split("/");
      const spreadsheetId = pathParts[0];
      const sheetName = decodeURIComponent(pathParts.slice(1).join("/"));
      
      if (!spreadsheetId || !sheetName) {
        return new Response(
          JSON.stringify({ error: "Missing spreadsheetId or sheetName" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const accessToken = await getValidAccessToken(user.id);
      if (!accessToken) {
        return new Response(
          JSON.stringify({ error: "Not connected to Google", code: "NOT_CONNECTED" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const maxRows = parseInt(url.searchParams.get("maxRows") || "1000");
      const data = await getSheetData(accessToken, spreadsheetId, sheetName, maxRows);
      
      return new Response(
        JSON.stringify(data),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Not found" }),
      { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Unhandled error:", error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});