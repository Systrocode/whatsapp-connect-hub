import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SubscriptionPlan, UserSubscription } from './useSubscription';

export interface SubscriptionWithUser extends UserSubscription {
  profile?: {
    id: string;
    business_name: string | null;
    phone_number: string | null;
  };
}

export const useAdminSubscriptions = () => {
  const queryClient = useQueryClient();

  // Fetch all subscriptions (admin only)
  const subscriptionsQuery = useQuery({
    queryKey: ['admin-subscriptions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select(`
          *,
          plan:subscription_plans(*)
        `)
        .order('current_period_end', { ascending: true });
      
      if (error) throw error;
      return data as unknown as SubscriptionWithUser[];
    },
  });

  // Fetch all plans
  const plansQuery = useQuery({
    queryKey: ['admin-plans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .order('price_monthly', { ascending: true });
      
      if (error) throw error;
      return data as SubscriptionPlan[];
    },
  });

  // Get expiring subscriptions (within N days)
  const getExpiringSubscriptions = (days: number = 7): SubscriptionWithUser[] => {
    const subscriptions = subscriptionsQuery.data ?? [];
    const now = new Date();
    const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    
    return subscriptions.filter(sub => {
      const endDate = new Date(sub.current_period_end);
      return endDate <= futureDate && endDate >= now && sub.status === 'active';
    });
  };

  // Get expired subscriptions
  const getExpiredSubscriptions = (): SubscriptionWithUser[] => {
    const subscriptions = subscriptionsQuery.data ?? [];
    const now = new Date();
    
    return subscriptions.filter(sub => {
      const endDate = new Date(sub.current_period_end);
      return endDate < now || sub.status === 'expired';
    });
  };

  // Extend subscription
  const extendSubscription = useMutation({
    mutationFn: async ({ userId, days }: { userId: string; days: number }) => {
      const subscription = subscriptionsQuery.data?.find(s => s.user_id === userId);
      if (!subscription) throw new Error('Subscription not found');
      
      const currentEnd = new Date(subscription.current_period_end);
      const newEnd = new Date(currentEnd.getTime() + days * 24 * 60 * 60 * 1000);
      
      const { error } = await supabase
        .from('user_subscriptions')
        .update({ 
          current_period_end: newEnd.toISOString(),
          status: 'active',
        })
        .eq('user_id', userId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-subscriptions'] });
      toast.success('Subscription extended');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Change subscription plan
  const changePlan = useMutation({
    mutationFn: async ({ userId, planId }: { userId: string; planId: string }) => {
      const { error } = await supabase
        .from('user_subscriptions')
        .update({ plan_id: planId })
        .eq('user_id', userId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-subscriptions'] });
      toast.success('Plan changed');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Cancel subscription
  const cancelSubscription = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from('user_subscriptions')
        .update({ status: 'cancelled' })
        .eq('user_id', userId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-subscriptions'] });
      toast.success('Subscription cancelled');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Reset usage
  const resetUsage = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from('user_subscriptions')
        .update({ messages_used: 0, contacts_used: 0 })
        .eq('user_id', userId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-subscriptions'] });
      toast.success('Usage reset');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Create/update plan
  const savePlan = useMutation({
    mutationFn: async (plan: Partial<SubscriptionPlan> & { id?: string }) => {
      if (plan.id) {
        const { error } = await supabase
          .from('subscription_plans')
          .update(plan as any)
          .eq('id', plan.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('subscription_plans')
          .insert(plan as any);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-plans'] });
      queryClient.invalidateQueries({ queryKey: ['subscription-plans'] });
      toast.success('Plan saved');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Calculate stats
  const getStats = () => {
    const subscriptions = subscriptionsQuery.data ?? [];
    const active = subscriptions.filter(s => s.status === 'active').length;
    const expiring = getExpiringSubscriptions(7).length;
    const expired = getExpiredSubscriptions().length;
    const totalRevenue = subscriptions.reduce((sum, sub) => {
      return sum + (sub.plan?.price_monthly ?? 0);
    }, 0);
    
    return { active, expiring, expired, totalRevenue, total: subscriptions.length };
  };

  return {
    subscriptions: subscriptionsQuery.data ?? [],
    plans: plansQuery.data ?? [],
    isLoading: subscriptionsQuery.isLoading || plansQuery.isLoading,
    getExpiringSubscriptions,
    getExpiredSubscriptions,
    extendSubscription,
    changePlan,
    cancelSubscription,
    resetUsage,
    savePlan,
    getStats,
  };
};
