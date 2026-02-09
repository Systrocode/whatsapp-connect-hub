import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UserWithRole {
  id: string;
  business_name: string | null;
  phone_number: string | null;
  created_at: string;
  role: 'admin' | 'moderator' | 'user';
}

export const useAdminUsers = () => {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ['adminUsers'],
    queryFn: async (): Promise<UserWithRole[]> => {
      // Get all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, business_name, phone_number, created_at')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Get all user roles
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Combine profiles with roles
      const rolesMap = new Map(roles?.map(r => [r.user_id, r.role]) || []);

      return (profiles || []).map(profile => ({
        ...profile,
        role: (rolesMap.get(profile.id) as 'admin' | 'moderator' | 'user') || 'user',
      }));
    },
    staleTime: 30 * 1000,
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, newRole }: { userId: string; newRole: 'admin' | 'moderator' | 'user' }) => {
      // Use server-side RPC function for admin role updates with proper validation
      const { data, error } = await supabase.rpc('admin_update_user_role', {
        p_user_id: userId,
        p_new_role: newRole,
      });

      if (error) throw error;

      const result = data as { success: boolean; error?: string };
      if (!result.success) {
        throw new Error(result.error || 'Failed to update role');
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      toast.success('User role updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update role: ' + error.message);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await (supabase.rpc as any)('delete_user_by_admin', {
        target_user_id: userId,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      toast.success('User deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete user: ' + error.message);
    },
  });

  return {
    users: usersQuery.data || [],
    isLoading: usersQuery.isLoading,
    error: usersQuery.error,
    updateRole: updateRoleMutation.mutate,
    isUpdating: updateRoleMutation.isPending,
    deleteUser: deleteUserMutation.mutate,
    isDeleting: deleteUserMutation.isPending,
  };
};
