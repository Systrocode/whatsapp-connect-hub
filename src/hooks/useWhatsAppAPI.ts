import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface WhatsAppConnectionStatus {
  connected: boolean;
  has_token: boolean;
  has_phone_number_id: boolean;
}

interface SendMessageParams {
  to: string;
  message?: string;
  template_name?: string;
  template_params?: unknown[];
}

interface BusinessProfile {
  about?: string;
  address?: string;
  description?: string;
  email?: string;
  websites?: string[];
  profile_picture_url?: string;
  vertical?: string;
}

export const useWhatsAppAPI = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Check WhatsApp connection status
  const connectionStatusQuery = useQuery({
    queryKey: ['whatsapp_connection_status', user?.id],
    queryFn: async (): Promise<WhatsAppConnectionStatus> => {
      const { data, error } = await supabase.functions.invoke('whatsapp-api', {
        body: { action: 'check_connection' }
      });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Fetch Business Profile
  const businessProfileQuery = useQuery({
    queryKey: ['whatsapp_business_profile', user?.id],
    queryFn: async (): Promise<BusinessProfile> => {
      const { data, error } = await supabase.functions.invoke('whatsapp-api', {
        body: { action: 'get_business_profile' }
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);
      return data;
    },
    enabled: !!user && !!connectionStatusQuery.data?.connected,
  });

  // Update Business Profile (Text Fields)
  const updateBusinessProfile = useMutation({
    mutationFn: async (profile: BusinessProfile) => {
      const { data, error } = await supabase.functions.invoke('whatsapp-api', {
        body: { action: 'update_business_profile', ...profile }
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['whatsapp_business_profile'] });
      toast.success('Business profile updated on WhatsApp');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update profile: ${error.message}`);
    },
  });

  // Upload Profile Photo
  const uploadProfilePhoto = useMutation({
    mutationFn: async (file: File) => {
      // We need to send this as FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('action', 'update_profile_photo');

      const { data, error } = await supabase.functions.invoke('whatsapp-api', {
        body: formData,
        // Supabase client automatically sets correct headers for FormData? 
        // No, functions.invoke expects JSON usually?
        // Actually, invoke helper handles FormData automatically if body is FormData!
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['whatsapp_business_profile'] });
      toast.success('Profile photo updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to upload photo: ${error.message}`);
    },
  });

  // Save access token securely (never exposed to client)
  const saveAccessToken = useMutation({
    mutationFn: async (access_token: string) => {
      const { data, error } = await supabase.functions.invoke('whatsapp-api', {
        body: { action: 'save_access_token', access_token }
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['whatsapp_connection_status'] });
      queryClient.invalidateQueries({ queryKey: ['whatsapp_settings'] });
      toast.success('Access token saved securely');
    },
    onError: (error: Error) => {
      toast.error(`Failed to save access token: ${error.message}`);
    },
  });

  // Send WhatsApp message
  const sendMessage = useMutation({
    mutationFn: async (params: SendMessageParams) => {
      const { data, error } = await supabase.functions.invoke('whatsapp-api', {
        body: { action: 'send_message', ...params }
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);
      return data;
    },
    onError: (error: Error) => {
      toast.error(`Failed to send message: ${error.message}`);
    },
  });

  return {
    connectionStatus: connectionStatusQuery.data,
    isCheckingConnection: connectionStatusQuery.isLoading,
    businessProfile: businessProfileQuery.data,
    isLoadingProfile: businessProfileQuery.isLoading,
    updateBusinessProfile,
    uploadProfilePhoto,
    saveAccessToken,
    sendMessage,
  };
};
