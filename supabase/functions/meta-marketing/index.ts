// @ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// @ts-ignore
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  handleCors,
  corsHeaders,
  applyRateLimit,
  requireAuth,
  jsonResponse,
  errorResponse,
} from "../_shared/security.ts";

declare const Deno: any;

const META_API_VERSION = "v21.0";
const META_GRAPH_URL = `https://graph.facebook.com/${META_API_VERSION}`;

// Lazy-init service-role client
function getSupabaseAdmin() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
}


// Convert short-lived token to long-lived token
async function getLongLivedToken(shortLivedToken: string, appId: string, appSecret: string) {
  const url = `${META_GRAPH_URL}/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${shortLivedToken}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data;
}

// List campaigns from Meta
async function listMetaCampaigns(adAccountId: string, marketingToken: string) {
  const url = `${META_GRAPH_URL}/act_${adAccountId}/campaigns?fields=id,name,status,objective,daily_budget,lifetime_budget,created_time,updated_time&access_token=${marketingToken}`;
  console.log("Fetching Meta campaigns...");
  const response = await fetch(url);
  const data = await response.json();
  if (data.error) { console.error("Meta API error:", data.error); throw new Error(data.error.message); }
  return data.data || [];
}

// Get campaign insights
async function getCampaignInsights(campaignId: string, datePreset: string = "last_7d", marketingToken: string) {
  const url = `${META_GRAPH_URL}/${campaignId}/insights?fields=impressions,clicks,spend,reach,ctr,cpc,actions&date_preset=${datePreset}&access_token=${marketingToken}`;
  console.log(`Fetching insights for campaign ${campaignId}...`);
  const response = await fetch(url);
  const data = await response.json();
  if (data.error) { console.error("Meta API error:", data.error); throw new Error(data.error.message); }
  return data.data?.[0] || null;
}

// Create a new campaign
async function createMetaCampaign(name: string, objective: string, status: string = "PAUSED", adAccountId: string, marketingToken: string) {
  const url = `${META_GRAPH_URL}/act_${adAccountId}/campaigns`;
  console.log("Creating Meta campaign:", name);
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      name, 
      objective, 
      status, 
      special_ad_categories: ["NONE"],
      is_adset_budget_sharing_enabled: false,
      access_token: marketingToken 
    }),
  });
  const data = await response.json();
  if (data.error) {
    console.error("Meta API error:", data.error);
    // Explicitly handle token expiration
    if (data.error.code === 190 || data.error.error_subcode === 463) {
      throw new Error("Your Meta Ad Account connection has expired. Please disconnect and reconnect your Ad Account in the dashboard.");
    }
    const metaErrorParams = data.error.error_user_msg || data.error.message || "Unknown error";
    const metaErrorDetails = data.error.error_user_title ? `${data.error.error_user_title}: ` : "";
    throw new Error(`${metaErrorDetails}${metaErrorParams} (Code: ${data.error.code})`);
  }
  return data;
}

// Update campaign status
async function updateCampaignStatus(campaignId: string, status: string, marketingToken: string) {
  const url = `${META_GRAPH_URL}/${campaignId}`;
  console.log(`Updating campaign ${campaignId} status to ${status}...`);
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status, access_token: marketingToken }),
  });
  const data = await response.json();
  if (data.error) { console.error("Meta API error:", data.error); throw new Error(data.error.message); }
  return data;
}

// Get ad account info
async function getAdAccountInfo(adAccountId: string, marketingToken: string) {
  const url = `${META_GRAPH_URL}/act_${adAccountId}?fields=name,account_status,amount_spent,balance,currency,business_name&access_token=${marketingToken}`;
  console.log("Fetching ad account info...");
  const response = await fetch(url);
  const data = await response.json();
  if (data.error) { console.error("Meta API error:", data.error); throw new Error(data.error.message); }
  return data;
}

serve(async (req: Request) => {
  // 1. CORS preflight
  const preflight = handleCors(req);
  if (preflight) return preflight;

  // 2. Rate-limit: 30 req/min per IP (pre-auth) — prevents enumeration attacks
  const ipRateLimit = applyRateLimit(req, { prefix: "meta-marketing", max: 30 });
  if (ipRateLimit) return ipRateLimit;

  try {
    // 3. Authenticate EVERY request
    const { user, response: authError } = await requireAuth(req);
    if (authError) return authError;
    const authenticatedUser = user!;

    // 4. Per-user rate-limit for expensive Meta API calls (30/min)
    const userRateLimit = applyRateLimit(req, {
      prefix: "meta-marketing",
      userId: authenticatedUser.id,
      max: 30,
    });
    if (userRateLimit) return userRateLimit;

    const ch = corsHeaders(req.headers.get("origin"));
    const supabaseAdmin = getSupabaseAdmin();
    const META_APP_ID = Deno.env.get("META_APP_ID") || "";
    const META_APP_SECRET = Deno.env.get("META_APP_SECRET") || "";

    // Fetch user's connected Meta ad account details
    const { data: userSettings, error: userSettingsError } = await supabaseAdmin
      .from("whatsapp_settings")
      .select("fb_user_access_token, ad_account_id")
      .eq("user_id", authenticatedUser.id)
      .single();

    if (userSettingsError || !userSettings?.fb_user_access_token || !userSettings?.ad_account_id) {
      throw new Error("No connected Meta Ad account found. Please connect your ad account first.");
    }

    const MARKETING_API_TOKEN = userSettings.fb_user_access_token;
    // FB returns 'act_123456789' or '123456789'. The Meta API functions prepend 'act_', so we strip it.
    let META_AD_ACCOUNT_ID = userSettings.ad_account_id;
    if (META_AD_ACCOUNT_ID.startsWith('act_')) {
      META_AD_ACCOUNT_ID = META_AD_ACCOUNT_ID.replace('act_', '');
    }

    const { action, ...params } = await req.json();
    console.log(`Processing action: ${action} for user: ${authenticatedUser.id}`);

    let result;

    switch (action) {
      case "list_campaigns":
        result = await listMetaCampaigns(META_AD_ACCOUNT_ID, MARKETING_API_TOKEN);
        break;

      case "get_insights":
        if (!params.campaignId) throw new Error("campaignId is required");
        result = await getCampaignInsights(params.campaignId, params.datePreset, MARKETING_API_TOKEN);
        break;

      case "create_campaign": {
        if (!params.name || !params.objective) throw new Error("name and objective are required");
        const metaCampaign = await createMetaCampaign(params.name, params.objective, params.status, META_AD_ACCOUNT_ID, MARKETING_API_TOKEN);

        const { data: dbCampaign, error: dbError } = await supabaseAdmin
          .from("campaigns")
          .insert({
            user_id: authenticatedUser.id,
            name: params.name,
            objective: params.objective,
            status: params.status || "draft",
            daily_budget: params.dailyBudget,
            meta_campaign_id: metaCampaign.id,
          })
          .select()
          .single();

        if (dbError) { console.error("Database error:", dbError); throw new Error("Failed to save campaign"); }
        result = { meta: metaCampaign, campaign: dbCampaign };
        break;
      }

      case "update_status":
        if (!params.campaignId || !params.status) throw new Error("campaignId and status are required");
        result = await updateCampaignStatus(params.campaignId, params.status, MARKETING_API_TOKEN);
        break;

      case "get_account":
        result = await getAdAccountInfo(META_AD_ACCOUNT_ID, MARKETING_API_TOKEN);
        break;

      case "exchange_token":
        if (!params.shortLivedToken) throw new Error("shortLivedToken is required");
        result = await getLongLivedToken(params.shortLivedToken, META_APP_ID, META_APP_SECRET);
        break;

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return jsonResponse(req, { success: true, data: result });
  } catch (error) {
    console.error("Error:", error);
    return jsonResponse(req, {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }, 200);
  }
});
