import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface CampaignLead {
  id: string;
  campaign_id: string;
  contact_id: string | null;
  phone_number: string;
  name: string | null;
  source: string | null;
  metadata: Record<string, any> | null;
  created_at: string;
  campaign?: {
    id: string;
    name: string;
    status: string;
  };
}

export const useCampaignLeads = (campaignId?: string) => {
  const { user } = useAuth();

  const leadsQuery = useQuery({
    queryKey: ['campaign-leads', user?.id, campaignId],
    queryFn: async () => {
      if (!user) return [];
      
      let query = supabase
        .from('campaign_leads')
        .select(`
          *,
          campaign:campaigns (
            id,
            name,
            status
          )
        `)
        .order('created_at', { ascending: false });
      
      if (campaignId) {
        query = query.eq('campaign_id', campaignId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as CampaignLead[];
    },
    enabled: !!user,
  });

  return {
    leads: leadsQuery.data ?? [],
    isLoading: leadsQuery.isLoading,
    error: leadsQuery.error,
    refetch: leadsQuery.refetch,
  };
};
