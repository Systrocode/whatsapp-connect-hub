import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const META_APP_ID = Deno.env.get("META_APP_ID")!;
const META_APP_SECRET = Deno.env.get("META_APP_SECRET")!;
const MARKETING_API_TOKEN = Deno.env.get("MARKETING_API_TOKEN")!;
const META_AD_ACCOUNT_ID = Deno.env.get("META_AD_ACCOUNT_ID")!;

const META_API_VERSION = "v21.0";
const META_GRAPH_URL = `https://graph.facebook.com/${META_API_VERSION}`;

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function getUserFromToken(authHeader: string | null) {
  if (!authHeader) return null;
  const token = authHeader.replace("Bearer ", "");
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  if (error) {
    console.error("Error verifying token:", error);
    return null;
  }
  return user;
}

// Convert short-lived token to long-lived token
async function getLongLivedToken(shortLivedToken: string) {
  const url = `${META_GRAPH_URL}/oauth/access_token?grant_type=fb_exchange_token&client_id=${META_APP_ID}&client_secret=${META_APP_SECRET}&fb_exchange_token=${shortLivedToken}`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  if (data.error) {
    throw new Error(data.error.message);
  }
  
  return data;
}

// List campaigns from Meta
async function listMetaCampaigns() {
  const url = `${META_GRAPH_URL}/act_${META_AD_ACCOUNT_ID}/campaigns?fields=id,name,status,objective,daily_budget,lifetime_budget,created_time,updated_time&access_token=${MARKETING_API_TOKEN}`;
  
  console.log("Fetching Meta campaigns...");
  const response = await fetch(url);
  const data = await response.json();
  
  if (data.error) {
    console.error("Meta API error:", data.error);
    throw new Error(data.error.message);
  }
  
  return data.data || [];
}

// Get campaign insights
async function getCampaignInsights(campaignId: string, datePreset: string = "last_7d") {
  const url = `${META_GRAPH_URL}/${campaignId}/insights?fields=impressions,clicks,spend,reach,ctr,cpc,actions&date_preset=${datePreset}&access_token=${MARKETING_API_TOKEN}`;
  
  console.log(`Fetching insights for campaign ${campaignId}...`);
  const response = await fetch(url);
  const data = await response.json();
  
  if (data.error) {
    console.error("Meta API error:", data.error);
    throw new Error(data.error.message);
  }
  
  return data.data?.[0] || null;
}

// Create a new campaign
async function createMetaCampaign(name: string, objective: string, status: string = "PAUSED") {
  const url = `${META_GRAPH_URL}/act_${META_AD_ACCOUNT_ID}/campaigns`;
  
  console.log("Creating Meta campaign:", name);
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      objective,
      status,
      special_ad_categories: [],
      access_token: MARKETING_API_TOKEN,
    }),
  });
  
  const data = await response.json();
  
  if (data.error) {
    console.error("Meta API error:", data.error);
    throw new Error(data.error.message);
  }
  
  return data;
}

// Update campaign status
async function updateCampaignStatus(campaignId: string, status: string) {
  const url = `${META_GRAPH_URL}/${campaignId}`;
  
  console.log(`Updating campaign ${campaignId} status to ${status}...`);
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      status,
      access_token: MARKETING_API_TOKEN,
    }),
  });
  
  const data = await response.json();
  
  if (data.error) {
    console.error("Meta API error:", data.error);
    throw new Error(data.error.message);
  }
  
  return data;
}

// Get ad account info
async function getAdAccountInfo() {
  const url = `${META_GRAPH_URL}/act_${META_AD_ACCOUNT_ID}?fields=name,account_status,amount_spent,balance,currency,business_name&access_token=${MARKETING_API_TOKEN}`;
  
  console.log("Fetching ad account info...");
  const response = await fetch(url);
  const data = await response.json();
  
  if (data.error) {
    console.error("Meta API error:", data.error);
    throw new Error(data.error.message);
  }
  
  return data;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("authorization");
    const user = await getUserFromToken(authHeader);
    
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { action, ...params } = await req.json();
    console.log(`Processing action: ${action} for user: ${user.id}`);

    let result;

    switch (action) {
      case "list_campaigns":
        result = await listMetaCampaigns();
        break;

      case "get_insights":
        if (!params.campaignId) {
          throw new Error("campaignId is required");
        }
        result = await getCampaignInsights(params.campaignId, params.datePreset);
        break;

      case "create_campaign":
        if (!params.name || !params.objective) {
          throw new Error("name and objective are required");
        }
        const metaCampaign = await createMetaCampaign(params.name, params.objective, params.status);
        
        // Store in database
        const { data: dbCampaign, error: dbError } = await supabaseAdmin
          .from("campaigns")
          .insert({
            user_id: user.id,
            name: params.name,
            objective: params.objective,
            status: params.status || "draft",
            daily_budget: params.dailyBudget,
            meta_campaign_id: metaCampaign.id,
          })
          .select()
          .single();
        
        if (dbError) {
          console.error("Database error:", dbError);
          throw new Error("Failed to save campaign");
        }
        
        result = { meta: metaCampaign, campaign: dbCampaign };
        break;

      case "update_status":
        if (!params.campaignId || !params.status) {
          throw new Error("campaignId and status are required");
        }
        result = await updateCampaignStatus(params.campaignId, params.status);
        break;

      case "get_account":
        result = await getAdAccountInfo();
        break;

      case "exchange_token":
        if (!params.shortLivedToken) {
          throw new Error("shortLivedToken is required");
        }
        result = await getLongLivedToken(params.shortLivedToken);
        break;

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(JSON.stringify({ success: true, data: result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
