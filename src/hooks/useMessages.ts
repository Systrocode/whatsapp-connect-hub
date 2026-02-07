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
  metadata?: any;
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
    mutationFn: async ({
      content,
      messageType = 'text',
      mediaUrl,
      filename,
      templateName,
      templateParams
    }: {
      content: string;
      messageType?: Message['message_type'] | 'audio' | 'video' | 'template';
      mediaUrl?: string;
      filename?: string;
      templateName?: string;
      templateParams?: any[];
    }) => {
      if (!conversationId) throw new Error('No conversation selected');

      // 1. Get the contact's phone number from the conversation
      const { data: conversation, error: convError } = await supabase
        .from('conversations')
        .select('contact:contacts(phone_number)')
        .eq('id', conversationId)
        .single();

      if (convError || !conversation?.contact) {
        throw new Error('Could not find contact information for this conversation');
      }

      // @ts-ignore - Supabase types might verify the shape, but we know it's an object/array structure
      const phoneNumber = conversation.contact.phone_number || (Array.isArray(conversation.contact) ? conversation.contact[0]?.phone_number : null);

      if (!phoneNumber) {
        throw new Error('Contact has no phone number');
      }

      // 2. Call the Edge Function to send the message
      const { data, error } = await supabase.functions.invoke('whatsapp-api', {
        body: {
          action: 'send_message',
          to: phoneNumber,
          message: content,
          type: messageType,
          media_url: mediaUrl,
          filename: filename,
          template_name: templateName,
          template_params: templateParams
        },
      });

      if (error) {
        console.error('Edge function error:', error);

        // Try to read the error body if it exists (FunctionsHttpError)
        if (error instanceof Error && 'context' in error) {
          // @ts-ignore
          const response = error.context?.response;
          if (response instanceof Response) {
            try {
              const errorData = await response.json();
              if (errorData && errorData.error) {
                throw new Error(errorData.error);
              }
            } catch (e) {
              // Failed to parse JSON, stick to original error
            }
          }
        }

        throw error;
      }

      if (data?.error) {
        throw new Error(typeof data.error === 'string' ? data.error : JSON.stringify(data.error));
      }

      return data;
    },
    onMutate: async (newMsgParams) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['messages', conversationId] });

      // Snapshot the previous value
      const previousMessages = queryClient.getQueryData<Message[]>(['messages', conversationId]);

      // Create optimistic message
      const optimisticMessage: Message = {
        id: `temp-${Date.now()}`,
        conversation_id: conversationId!,
        content: newMsgParams.content,
        direction: 'outbound',
        message_type: (newMsgParams.messageType as any) || 'text',
        status: 'pending',
        whatsapp_message_id: null,
        created_at: new Date().toISOString(),
      };

      // Handle media content structure for optimistic render
      if (['image', 'video', 'audio', 'document'].includes(newMsgParams.messageType || '')) {
        optimisticMessage.content = JSON.stringify({
          [newMsgParams.messageType || 'document']: { link: newMsgParams.mediaUrl },
          caption: newMsgParams.content,
          filename: newMsgParams.filename
        });
      }

      // Optimistically update to the new value
      queryClient.setQueryData<Message[]>(['messages', conversationId], (old) => {
        return [...(old || []), optimisticMessage];
      });

      // Return a context object with the snapshotted value
      return { previousMessages };
    },
    onError: (err, newMsg, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousMessages) {
        queryClient.setQueryData(['messages', conversationId], context.previousMessages);
      }
      toast.error(`Failed to send: ${err.message}`);
    },
    onSettled: () => {
      // Always refetch after error or success:
      queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });

  return {
    messages: messagesQuery.data ?? [],
    isLoading: messagesQuery.isLoading,
    error: messagesQuery.error,
    sendMessage,
  };
};