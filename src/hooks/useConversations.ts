import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import type { Contact } from './useContacts';

export interface Conversation {
  id: string;
  user_id: string;
  contact_id: string;
  status: 'active' | 'waiting' | 'resolved';
  last_message_at: string;
  unread_count: number;
  created_at: string;
  updated_at: string;
  contact?: Contact;
}

export interface ConversationWithContact extends Conversation {
  contacts: Contact | null;
}

export const useConversations = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const conversationsQuery = useQuery({
    queryKey: ['conversations', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          contacts (*)
        `)
        .order('last_message_at', { ascending: false });

      if (error) throw error;
      return data as ConversationWithContact[];
    },
    enabled: !!user,
  });

  // Real-time subscription
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('conversations-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'conversations',
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['conversations'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, queryClient]);

  const createConversation = useMutation({
    mutationFn: async (contactId: string) => {
      if (!user) throw new Error('User not authenticated');

      // Check if conversation already exists
      const { data: existing } = await supabase
        .from('conversations')
        .select('*')
        .eq('contact_id', contactId)
        .single();

      if (existing) return existing;

      const { data, error } = await supabase
        .from('conversations')
        .insert({
          user_id: user.id,
          contact_id: contactId,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const updateConversation = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Conversation> & { id: string }) => {
      const { data, error } = await supabase
        .from('conversations')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const markAsRead = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('conversations')
        .update({ unread_count: 0 })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
    onError: (error: Error) => {
      console.error('Error marking as read:', error);
    },
  });

  return {
    conversations: conversationsQuery.data ?? [],
    isLoading: conversationsQuery.isLoading,
    error: conversationsQuery.error,
    createConversation,
    updateConversation,
    markAsRead,
  };
};