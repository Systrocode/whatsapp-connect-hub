import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface Contact {
  id: string;
  user_id: string;
  phone_number: string;
  name: string | null;
  email: string | null;
  tags: string[];
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateContactData {
  phone_number: string;
  name?: string;
  email?: string;
  tags?: string[];
  notes?: string;
}

export const useContacts = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const contactsQuery = useQuery({
    queryKey: ['contacts', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Contact[];
    },
    enabled: !!user,
  });

  const createContact = useMutation({
    mutationFn: async (contactData: CreateContactData) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('contacts')
        .insert({
          ...contactData,
          user_id: user.id,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data as Contact;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Contact created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const updateContact = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Contact> & { id: string }) => {
      const { data, error } = await supabase
        .from('contacts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Contact;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Contact updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const deleteContact = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Contact deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    contacts: contactsQuery.data ?? [],
    isLoading: contactsQuery.isLoading,
    error: contactsQuery.error,
    createContact,
    updateContact,
    deleteContact,
  };
};