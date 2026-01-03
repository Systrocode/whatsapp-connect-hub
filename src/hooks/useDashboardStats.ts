import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface DashboardStats {
    totalConversations: number;
    totalContacts: number;
    unreadMessages: number;
    totalMessages: number;
}

export const useDashboardStats = () => {
    const { user } = useAuth();

    return useQuery({
        queryKey: ['dashboard-stats', user?.id],
        queryFn: async (): Promise<DashboardStats> => {
            if (!user) return { totalConversations: 0, totalContacts: 0, unreadMessages: 0, totalMessages: 0 };

            // 1. Total Conversations
            const { count: conversationsCount } = await supabase
                .from('conversations')
                .select('*', { count: 'exact', head: true });

            // 2. Total Contacts
            const { count: contactsCount } = await supabase
                .from('contacts')
                .select('*', { count: 'exact', head: true });

            // 3. Unread Messages (Sum of unread_count column in conversations)
            const { data: unreadData } = await supabase
                .from('conversations')
                .select('unread_count');

            const unreadCount = unreadData?.reduce((acc, curr) => acc + (curr.unread_count || 0), 0) || 0;

            // 4. Total Messages
            const { count: messagesCount } = await supabase
                .from('messages')
                .select('*', { count: 'exact', head: true });

            return {
                totalConversations: conversationsCount || 0,
                totalContacts: contactsCount || 0,
                unreadMessages: unreadCount,
                totalMessages: messagesCount || 0,
            };
        },
        enabled: !!user,
    });
};
