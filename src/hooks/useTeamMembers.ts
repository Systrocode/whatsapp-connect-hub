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
      
      const { data: members, error: membersError } = await supabase
        .from('team_members')
        .select('user_id, role');

      if (membersError) {
        console.error('Error fetching team members:', membersError);
        return [];
      }

      if (!members || members.length === 0) return [];

      const userIds = members.map(m => m.user_id);

      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, business_name')
        .in('id', userIds);

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        return [];
      }

      const profilesMap = new Map(profiles.map(p => [p.id, p]));

      return members.map(m => ({
        user_id: m.user_id,
        role: m.role,
        profiles: profilesMap.get(m.user_id) || null
      })) as TeamMember[];
    },
    enabled: !!user,
  });
};
