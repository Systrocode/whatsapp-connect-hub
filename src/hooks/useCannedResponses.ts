
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface CannedResponse {
    id: string;
    shortcut: string;
    content: string;
    created_at: string;
}

export function useCannedResponses() {
    const queryClient = useQueryClient();

    const { data: responses = [], isLoading } = useQuery({
        queryKey: ['canned_responses'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('canned_responses' as any)
                .select('*')
                .order('shortcut', { ascending: true });

            if (error) {
                console.error('Failed to load quick replies:', error);
                // Return empty array on error to prevent UI crash
                return [];
            }

            return (data as unknown) as CannedResponse[];
        },
    });

    const createResponse = useMutation({
        mutationFn: async (newResponse: { shortcut: string; content: string }) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Not authenticated');

            const { data, error } = await supabase
                .from('canned_responses' as any)
                .insert({
                    user_id: user.id,
                    shortcut: newResponse.shortcut,
                    content: newResponse.content,
                })
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['canned_responses'] });
            toast.success('Quick reply created');
        },
        onError: (error) => {
            toast.error('Failed to create quick reply: ' + error.message);
        },
    });

    const deleteResponse = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('canned_responses' as any)
                .delete()
                .eq('id', id);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['canned_responses'] });
            toast.success('Quick reply deleted');
        },
        onError: (error) => {
            toast.error('Failed to delete quick reply');
        },
    });

    return {
        responses,
        isLoading,
        createResponse,
        deleteResponse,
    };
}
