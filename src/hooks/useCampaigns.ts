import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Campaign {
  id: string;
  user_id: string;
  name: string;
  objective: string;
  status: string;
  daily_budget: number | null;
  lifetime_budget: number | null;
  start_date: string | null;
  end_date: string | null;
  meta_campaign_id: string | null;
  meta_adset_id: string | null;
  meta_ad_id: string | null;
  targeting: Record<string, unknown>;
  creative: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

interface CreateCampaignParams {
  name: string;
  objective: string;
  dailyBudget?: number;
  status?: string;
}

export function useCampaigns() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: campaigns,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("campaigns")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Campaign[];
    },
  });

  const createCampaignMutation = useMutation({
    mutationFn: async (params: CreateCampaignParams) => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) throw new Error("Not authenticated");

      const response = await supabase.functions.invoke("meta-marketing", {
        body: {
          action: "create_campaign",
          ...params,
        },
      });

      if (response.error) throw new Error(response.error.message);
      if (!response.data.success) throw new Error(response.data.error);
      
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      toast({
        title: "Campaign created",
        description: "Your campaign has been created successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ campaignId, status }: { campaignId: string; status: string }) => {
      const response = await supabase.functions.invoke("meta-marketing", {
        body: {
          action: "update_status",
          campaignId,
          status,
        },
      });

      if (response.error) throw new Error(response.error.message);
      if (!response.data.success) throw new Error(response.data.error);

      // Update local database
      const { error } = await supabase
        .from("campaigns")
        .update({ status: status.toLowerCase() })
        .eq("meta_campaign_id", campaignId);

      if (error) throw error;
      
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      toast({
        title: "Status updated",
        description: "Campaign status has been updated.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteCampaignMutation = useMutation({
    mutationFn: async (campaignId: string) => {
      const { error } = await supabase
        .from("campaigns")
        .delete()
        .eq("id", campaignId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      toast({
        title: "Campaign deleted",
        description: "Campaign has been deleted.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    campaigns,
    isLoading,
    error,
    createCampaign: createCampaignMutation.mutate,
    isCreating: createCampaignMutation.isPending,
    updateStatus: updateStatusMutation.mutate,
    isUpdatingStatus: updateStatusMutation.isPending,
    deleteCampaign: deleteCampaignMutation.mutate,
    isDeleting: deleteCampaignMutation.isPending,
  };
}

export function useCampaignInsights(campaignId: string | undefined) {
  return useQuery({
    queryKey: ["campaign-insights", campaignId],
    queryFn: async () => {
      if (!campaignId) return null;

      const response = await supabase.functions.invoke("meta-marketing", {
        body: {
          action: "get_insights",
          campaignId,
          datePreset: "last_7d",
        },
      });

      if (response.error) throw new Error(response.error.message);
      if (!response.data.success) throw new Error(response.data.error);
      
      return response.data.data;
    },
    enabled: !!campaignId,
  });
}

export function useAdAccount() {
  return useQuery({
    queryKey: ["ad-account"],
    queryFn: async () => {
      const response = await supabase.functions.invoke("meta-marketing", {
        body: { action: "get_account" },
      });

      if (response.error) throw new Error(response.error.message);
      if (!response.data.success) throw new Error(response.data.error);
      
      return response.data.data;
    },
  });
}
