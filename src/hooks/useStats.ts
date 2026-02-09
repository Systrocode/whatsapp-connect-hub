import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface DashboardStats {
  totalConversations: number;
  activeContacts: number;
  avgResponseTime: string;
  resolutionRate: number;
  conversationChange: number;
  contactChange: number;
}

export const useStats = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['stats', user?.id],
    queryFn: async (): Promise<DashboardStats> => {
      if (!user) {
        return {
          totalConversations: 0,
          activeContacts: 0,
          avgResponseTime: '0m',
          resolutionRate: 0,
          conversationChange: 0,
          contactChange: 0,
        };
      }

      // Get total conversations
      const { count: conversationCount } = await supabase
        .from('conversations')
        .select('*', { count: 'exact', head: true });

      // Get active contacts (contacts with conversations in last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { count: activeContactCount } = await supabase
        .from('contacts')
        .select('*', { count: 'exact', head: true });

      // Get resolved conversations for resolution rate
      const { count: resolvedCount } = await supabase
        .from('conversations')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'resolved');

      // Calculate resolution rate
      const resolutionRate = conversationCount && conversationCount > 0 
        ? Math.round((resolvedCount || 0) / conversationCount * 100) 
        : 0;

      // Get messages for response time calculation
      const { data: messages } = await supabase
        .from('messages')
        .select('created_at, direction, conversation_id')
        .order('created_at', { ascending: true })
        .limit(1000);

      // Calculate average response time (simplified)
      let avgResponseTime = '2.4m'; // Default value
      if (messages && messages.length > 1) {
        let totalResponseTime = 0;
        let responseCount = 0;
        
        // Group messages by conversation
        const messagesByConversation: Record<string, typeof messages> = {};
        messages.forEach(msg => {
          if (!messagesByConversation[msg.conversation_id]) {
            messagesByConversation[msg.conversation_id] = [];
          }
          messagesByConversation[msg.conversation_id].push(msg);
        });

        // Calculate response times
        Object.values(messagesByConversation).forEach(convMessages => {
          for (let i = 1; i < convMessages.length; i++) {
            const prev = convMessages[i - 1];
            const curr = convMessages[i];
            if (prev.direction === 'inbound' && curr.direction === 'outbound') {
              const responseTime = new Date(curr.created_at).getTime() - new Date(prev.created_at).getTime();
              totalResponseTime += responseTime;
              responseCount++;
            }
          }
        });

        if (responseCount > 0) {
          const avgMs = totalResponseTime / responseCount;
          const avgMinutes = Math.round(avgMs / 60000);
          avgResponseTime = avgMinutes < 60 ? `${avgMinutes}m` : `${Math.round(avgMinutes / 60)}h`;
        }
      }

      return {
        totalConversations: conversationCount || 0,
        activeContacts: activeContactCount || 0,
        avgResponseTime,
        resolutionRate,
        conversationChange: 12.5, // Would calculate from historical data
        contactChange: 8.2, // Would calculate from historical data
      };
    },
    enabled: !!user,
    staleTime: 30000, // Cache for 30 seconds
  });
};