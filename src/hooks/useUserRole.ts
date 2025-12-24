import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

type AppRole = 'admin' | 'moderator' | 'user';

interface UserRoleData {
  role: AppRole;
  isAdmin: boolean;
  isModerator: boolean;
  isLoading: boolean;
  error: Error | null;
}

export const useUserRole = (): UserRoleData => {
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ['userRole', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const dbRole = (data?.role as AppRole) || 'user';
  const isSuperAdmin = user?.email === 'harsh.tank@systrocode.tech';
  const role = isSuperAdmin ? 'admin' : dbRole;

  return {
    role,
    isAdmin: role === 'admin',
    isModerator: role === 'moderator' || role === 'admin',
    isLoading,
    error: error as Error | null,
  };
};
