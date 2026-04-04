
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface SegmentCriteria {
    tags?: string[];
    last_active_days?: number; // e.g., > 7 days
    signup_date_start?: string;
    signup_date_end?: string;
    meta_custom_audience_id?: string;
    meta_synced_at?: string;
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

    const syncSegmentToMeta = useMutation({
        mutationFn: async (params: { segmentId: string; name: string }) => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('Not authenticated');

            const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/meta-marketing`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.access_token}`,
                },
                body: JSON.stringify({
                    action: 'sync_segment',
                    segmentId: params.segmentId,
                    name: params.name
                })
            });

            const result = await res.json();
            if (!result.success) throw new Error(result.error);
            return result.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['segments'] });
            toast.success('Successfully synced segment to Meta Ads');
        },
        onError: (error: any) => {
            toast.error('Failed to sync to Meta: ' + error.message);
        }
    });

    const getMetaSegmentInsights = useMutation({
        mutationFn: async (customAudienceId: string) => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('Not authenticated');

            const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/meta-marketing`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.access_token}`,
                },
                body: JSON.stringify({
                    action: 'get_segment_insights',
                    customAudienceId
                })
            });

            const result = await res.json();
            if (!result.success) throw new Error(result.error);
            return result.data;
        },
        onError: (error: any) => {
            toast.error('Failed to load insights: ' + error.message);
        }
    });

    return {
        segments,
        isLoading,
        createSegment,
        deleteSegment,
        syncSegmentToMeta,
        getMetaSegmentInsights,
    };
}
