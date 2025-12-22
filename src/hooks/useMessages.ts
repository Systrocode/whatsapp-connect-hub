import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface Message {
  id: string;
  conversation_id: string;
  content: string;
  direction: 'inbound' | 'outbound';
  message_type: 'text' | 'image' | 'document' | 'template';
  status: 'pending' | 'sent' | 'delivered' | 'read' | 'failed';
  whatsapp_message_id: string | null;
  created_at: string;
}

export const useMessages = (conversationId: string | undefined) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const messagesQuery = useQuery({
    queryKey: ['messages', conversationId],
    queryFn: async () => {
      if (!conversationId) return [];
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as Message[];
    },
    enabled: !!conversationId && !!user,
  });

  // Real-time subscription for messages
  useEffect(() => {
    if (!conversationId || !user) return;

    const channel = supabase
      .channel(`messages-${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, user, queryClient]);

  const sendMessage = useMutation({
    mutationFn: async ({ content, messageType = 'text' }: { content: string; messageType?: Message['message_type'] }) => {
      if (!conversationId) throw new Error('No conversation selected');
      
      const { data, error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          content,
          direction: 'outbound',
          message_type: messageType,
          status: 'sent',
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Update conversation last_message_at
      await supabase
        .from('conversations')
        .update({ last_message_at: new Date().toISOString() })
        .eq('id', conversationId);
      
      return data as Message;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    messages: messagesQuery.data ?? [],
    isLoading: messagesQuery.isLoading,
    error: messagesQuery.error,
    sendMessage,
  };
};