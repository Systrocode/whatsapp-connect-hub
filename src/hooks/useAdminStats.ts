import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface AdminStats {
  totalUsers: number;
  totalConversations: number;
  totalMessages: number;
  totalContacts: number;
  activeUsersToday: number;
  pendingTemplates: number;
}

export const useAdminStats = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['adminStats', user?.id],
    queryFn: async (): Promise<AdminStats> => {
      // Get total users count from profiles
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Get total conversations
      const { count: totalConversations } = await supabase
        .from('conversations')
        .select('*', { count: 'exact', head: true });

      // Get total messages
      const { count: totalMessages } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true });

      // Get total contacts
      const { count: totalContacts } = await supabase
        .from('contacts')
        .select('*', { count: 'exact', head: true });

      // Get pending templates (not approved)
      const { count: pendingTemplates } = await supabase
        .from('message_templates')
        .select('*', { count: 'exact', head: true })
        .eq('is_approved', false);

      // Active users (profiles updated today)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const { count: activeUsersToday } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('updated_at', today.toISOString());

      return {
        totalUsers: totalUsers || 0,
        totalConversations: totalConversations || 0,
        totalMessages: totalMessages || 0,
        totalContacts: totalContacts || 0,
        activeUsersToday: activeUsersToday || 0,
        pendingTemplates: pendingTemplates || 0,
      };
    },
    enabled: !!user,
    staleTime: 60 * 1000, // 1 minute
  });
};
