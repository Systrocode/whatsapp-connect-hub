import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface MessageTemplate {
  id: string;
  user_id: string;
  name: string;
  content: string;
  category: string;
  variables: string[];
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateTemplateData {
  name: string;
  content: string;
  category?: string;
  variables?: string[];
}

export const useTemplates = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const templatesQuery = useQuery({
    queryKey: ['templates', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('message_templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching templates:', error);
        return [];
      }
      return data as MessageTemplate[];
    },
    enabled: !!user,
  });

  const createTemplate = useMutation({
    mutationFn: async (templateData: CreateTemplateData & { headerType?: string }) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase.functions.invoke('create-template', {
        body: {
          ...templateData,
          headerType: templateData.headerType || 'NONE'
        }
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      toast.success('Template submitted to Meta for approval');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const updateTemplate = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<MessageTemplate> & { id: string }) => {
      const { data, error } = await supabase
        .from('message_templates')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as MessageTemplate;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      toast.success('Template updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const deleteTemplate = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('message_templates')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      toast.success('Template deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    templates: templatesQuery.data ?? [],
    isLoading: templatesQuery.isLoading,
    error: templatesQuery.error,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    syncTemplates: useMutation({
      mutationFn: async () => {
        const { data, error } = await supabase.functions.invoke('whatsapp-api', {
          body: { action: 'sync_templates' }
        });

        if (error) throw error;
        if (data.error) throw new Error(data.error);

        return data;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['templates'] });
        toast.success(`Synced ${data.count} templates from Meta`);
      },
      onError: (error: Error) => {
        toast.error(`Sync failed: ${error.message}`);
      }
    }),
  };
};