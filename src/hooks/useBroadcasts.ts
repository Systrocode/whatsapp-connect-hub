import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface BroadcastCampaign {
  id: string;
  user_id: string;
  name: string;
  template_id: string | null;
  message_content: string | null;
  segment_filter: Record<string, unknown>;
  status: 'draft' | 'scheduled' | 'sending' | 'completed' | 'failed' | 'cancelled';
  scheduled_at: string | null;
  sent_at: string | null;
  total_recipients: number;
  sent_count: number;
  delivered_count: number;
  failed_count: number;
  created_at: string;
  updated_at: string;
  template?: {
    id: string;
    name: string;
    content: string;
  };
}

export interface BroadcastRecipient {
  id: string;
  campaign_id: string;
  contact_id: string;
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  sent_at: string | null;
  error_message: string | null;
  contact?: {
    id: string;
    name: string | null;
    phone_number: string;
  };
}

export const useBroadcasts = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch all campaigns
  const campaignsQuery = useQuery({
    queryKey: ['broadcasts', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from('broadcast_campaigns')
        .select(`
          *,
          template:message_templates(id, name, content)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching broadcasts:', error);
        return [];
      }
      return data as BroadcastCampaign[];
    },
    enabled: !!user?.id,
  });

  // Create campaign
  const createCampaign = useMutation({
    mutationFn: async (campaign: {
      name: string;
      template_id?: string;
      message_content?: string;
      segment_filter?: Record<string, unknown>;
      scheduled_at?: string;
    }) => {
      if (!user?.id) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('broadcast_campaigns')
        .insert({
          name: campaign.name,
          template_id: campaign.template_id,
          message_content: campaign.message_content,
          segment_filter: campaign.segment_filter as any,
          scheduled_at: campaign.scheduled_at,
          user_id: user.id,
          status: campaign.scheduled_at ? 'scheduled' : 'draft',
        })
        .select()
        .single();

      if (error) throw error;
      return data as BroadcastCampaign;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['broadcasts'] });
      toast.success('Campaign created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Update campaign
  const updateCampaign = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<BroadcastCampaign> & { id: string }) => {
      const { data, error } = await supabase
        .from('broadcast_campaigns')
        .update(updates as any)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as BroadcastCampaign;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['broadcasts'] });
      toast.success('Campaign updated');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Add recipients to campaign
  const addRecipients = useMutation({
    mutationFn: async ({ campaignId, contactIds }: { campaignId: string; contactIds: string[] }) => {
      const recipients = contactIds.map(contactId => ({
        campaign_id: campaignId,
        contact_id: contactId,
        status: 'pending' as const,
      }));

      const { error } = await supabase
        .from('broadcast_recipients')
        .insert(recipients);

      if (error) throw error;

      // Update total recipients count
      await supabase
        .from('broadcast_campaigns')
        .update({ total_recipients: contactIds.length })
        .eq('id', campaignId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['broadcasts'] });
      toast.success('Recipients added');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Get campaign recipients
  const getCampaignRecipients = async (campaignId: string): Promise<BroadcastRecipient[]> => {
    const { data, error } = await supabase
      .from('broadcast_recipients')
      .select(`
        *,
        contact:contacts(id, name, phone_number)
      `)
      .eq('campaign_id', campaignId);

    if (error) throw error;
    return data as BroadcastRecipient[];
  };

  // Delete campaign
  const deleteCampaign = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('broadcast_campaigns')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['broadcasts'] });
      toast.success('Campaign deleted');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    campaigns: campaignsQuery.data ?? [],
    isLoading: campaignsQuery.isLoading,
    createCampaign,
    updateCampaign,
    addRecipients,
    getCampaignRecipients,
    deleteCampaign,
  };
};
