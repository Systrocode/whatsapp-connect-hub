import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface Profile {
  id: string;
  business_name: string | null;
  phone_number: string | null;
  created_at: string;
  updated_at: string;
}

export interface WhatsAppSettings {
  id: string;
  user_id: string;
  phone_number_id: string | null;
  business_account_id: string | null;
  webhook_verify_token: string | null;
  is_connected: boolean;
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const profileQuery = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data as Profile | null;
    },
    enabled: !!user,
  });

  const whatsappSettingsQuery = useQuery({
    queryKey: ['whatsapp_settings', user?.id],
    queryFn: async () => {
      if (!user) return null;
      // Explicitly select only non-sensitive columns - DO NOT use select('*')
      // access_token_encrypted must never be sent to the client
      const { data, error } = await supabase
        .from('whatsapp_settings')
        .select('id, user_id, phone_number_id, business_account_id, webhook_verify_token, is_connected, created_at, updated_at')
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data as WhatsAppSettings | null;
    },
    enabled: !!user,
  });

  const updateProfile = useMutation({
    mutationFn: async (updates: Partial<Profile>) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Profile;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Profile updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const updateWhatsAppSettings = useMutation({
    mutationFn: async (updates: Partial<WhatsAppSettings>) => {
      if (!user) throw new Error('User not authenticated');
      
      // Try to update first, if no row exists, insert
      const { data: existing } = await supabase
        .from('whatsapp_settings')
        .select('id')
        .eq('user_id', user.id)
        .single();
      
      // Explicitly select only non-sensitive columns in responses
      const safeColumns = 'id, user_id, phone_number_id, business_account_id, webhook_verify_token, is_connected, created_at, updated_at';
      
      if (existing) {
        const { data, error } = await supabase
          .from('whatsapp_settings')
          .update(updates)
          .eq('user_id', user.id)
          .select(safeColumns)
          .single();
        
        if (error) throw error;
        return data as WhatsAppSettings;
      } else {
        const { data, error } = await supabase
          .from('whatsapp_settings')
          .insert({ ...updates, user_id: user.id })
          .select(safeColumns)
          .single();
        
        if (error) throw error;
        return data as WhatsAppSettings;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['whatsapp_settings'] });
      toast.success('WhatsApp settings updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    profile: profileQuery.data,
    whatsappSettings: whatsappSettingsQuery.data,
    isLoading: profileQuery.isLoading || whatsappSettingsQuery.isLoading,
    updateProfile,
    updateWhatsAppSettings,
  };
};