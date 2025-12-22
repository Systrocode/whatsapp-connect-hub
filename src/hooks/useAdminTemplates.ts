import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Template {
  id: string;
  name: string;
  content: string;
  category: string | null;
  is_approved: boolean;
  created_at: string;
  user_id: string;
}

export const useAdminTemplates = () => {
  const queryClient = useQueryClient();

  const templatesQuery = useQuery({
    queryKey: ['adminTemplates'],
    queryFn: async (): Promise<Template[]> => {
      const { data, error } = await supabase
        .from('message_templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    staleTime: 30 * 1000,
  });

  const approveTemplateMutation = useMutation({
    mutationFn: async ({ templateId, approve }: { templateId: string; approve: boolean }) => {
      // Use server-side RPC function for admin template approval
      const { data, error } = await supabase.rpc('admin_approve_template', {
        p_template_id: templateId,
        p_approve: approve,
      });

      if (error) throw error;

      const result = data as { success: boolean; error?: string };
      if (!result.success) {
        throw new Error(result.error || 'Failed to update template');
      }

      return result;
    },
    onSuccess: (_, { approve }) => {
      queryClient.invalidateQueries({ queryKey: ['adminTemplates'] });
      toast.success(approve ? 'Template approved' : 'Template rejected');
    },
    onError: (error) => {
      toast.error('Failed to update template: ' + error.message);
    },
  });

  const deleteTemplateMutation = useMutation({
    mutationFn: async (templateId: string) => {
      // Use server-side RPC function for admin template deletion
      const { data, error } = await supabase.rpc('admin_delete_template', {
        p_template_id: templateId,
      });

      if (error) throw error;

      const result = data as { success: boolean; error?: string };
      if (!result.success) {
        throw new Error(result.error || 'Failed to delete template');
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminTemplates'] });
      toast.success('Template deleted');
    },
    onError: (error) => {
      toast.error('Failed to delete template: ' + error.message);
    },
  });

  return {
    templates: templatesQuery.data || [],
    isLoading: templatesQuery.isLoading,
    error: templatesQuery.error,
    approveTemplate: approveTemplateMutation.mutate,
    deleteTemplate: deleteTemplateMutation.mutate,
    isUpdating: approveTemplateMutation.isPending || deleteTemplateMutation.isPending,
  };
};
