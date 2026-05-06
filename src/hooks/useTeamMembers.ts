import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface TeamMember {
  user_id: string;
  role: string;
  profiles: {
    business_name: string | null;
  } | null;
}

export const useTeamMembers = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['teamMembers', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('team_members')
        .select(`
          user_id,
          role,
          profiles:user_id (business_name)
        `);

      if (error) {
        console.error('Error fetching team members:', error);
        return [];
      }
      return data as TeamMember[];
    },
    enabled: !!user,
  });
};
