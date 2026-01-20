
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface SegmentCriteria {
    tags?: string[];
    last_active_days?: number; // e.g., > 7 days
    signup_date_start?: string;
    signup_date_end?: string;
}

export interface Segment {
    id: string;
    name: string;
    criteria: SegmentCriteria;
    created_at: string;
    recipient_count?: number; // Virtual field for UI
}

export function useSegments() {
    const queryClient = useQueryClient();

    const { data: segments = [], isLoading } = useQuery({
        queryKey: ['segments'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('segments' as any)
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Failed to load segments:', error);
                return [];
            }

            return (data as unknown) as Segment[];
        },
    });

    const createSegment = useMutation({
        mutationFn: async (newSegment: { name: string; criteria: SegmentCriteria }) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Not authenticated');

            const { data, error } = await supabase
                .from('segments' as any)
                .insert({
                    user_id: user.id,
                    name: newSegment.name,
                    criteria: newSegment.criteria,
                })
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['segments'] });
            toast.success('Segment created successfully');
        },
        onError: (error) => {
            toast.error('Failed to create segment: ' + error.message);
        },
    });

    const deleteSegment = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('segments' as any)
                .delete()
                .eq('id', id);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['segments'] });
            toast.success('Segment deleted');
        },
        onError: () => {
            toast.error('Failed to delete segment');
        },
    });

    return {
        segments,
        isLoading,
        createSegment,
        deleteSegment,
    };
}
