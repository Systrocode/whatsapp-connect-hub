import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string | null;
  price_monthly: number;
  price_yearly: number | null;
  message_limit: number;
  contact_limit: number;
  features: string[];
  is_active: boolean;
}

export interface UserSubscription {
  id: string;
  user_id: string;
  plan_id: string | null;
  status: 'active' | 'expired' | 'cancelled' | 'trial';
  payment_gateway: string | null;
  gateway_subscription_id: string | null;
  gateway_customer_id: string | null;
  current_period_start: string;
  current_period_end: string;
  messages_used: number;
  contacts_used: number;
  plan?: SubscriptionPlan;
}

export const useSubscription = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch available plans
  const plansQuery = useQuery({
    queryKey: ['subscription-plans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('is_active', true)
        .order('price_monthly', { ascending: true });

      if (error) {
        console.error('Error fetching plans:', error);
        return [];
      }
      return data as SubscriptionPlan[];
    },
  });

  // Fetch user's subscription
  const subscriptionQuery = useQuery({
    queryKey: ['user-subscription', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      const { data, error } = await supabase
        .from('user_subscriptions')
        .select(`
          *,
          subscription_plans(*)
        `)
        .eq('user_id', user.id)
        .maybeSingle();

      if (data) {
        // @ts-ignore
        data.plan = data.subscription_plans;
      }

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching subscription:', error);
        return null;
      }
      return data as UserSubscription | null;
    },
    enabled: !!user?.id,
  });

  // Check usage limits
  const checkUsageLimit = (type: 'messages' | 'contacts'): boolean => {
    const subscription = subscriptionQuery.data;
    if (!subscription?.plan) return false;

    if (type === 'messages') {
      return subscription.messages_used < subscription.plan.message_limit;
    }
    return subscription.contacts_used < subscription.plan.contact_limit;
  };

  // Get usage percentage
  const getUsagePercentage = (type: 'messages' | 'contacts'): number => {
    const subscription = subscriptionQuery.data;
    if (!subscription?.plan) return 0;

    if (type === 'messages') {
      return (subscription.messages_used / subscription.plan.message_limit) * 100;
    }
    return (subscription.contacts_used / subscription.plan.contact_limit) * 100;
  };

  // Check if subscription is expiring soon (within 7 days)
  const isExpiringSoon = (): boolean => {
    const subscription = subscriptionQuery.data;
    if (!subscription) return false;

    const endDate = new Date(subscription.current_period_end);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
  };

  // Increment usage using server-side atomic function
  const incrementUsage = useMutation({
    mutationFn: async ({ type, amount = 1 }: { type: 'messages' | 'contacts'; amount?: number }) => {
      if (!user?.id) throw new Error('Not authenticated');

      // Use server-side RPC function for atomic increment with limit enforcement
      const { data, error } = await supabase.rpc('increment_usage', {
        p_user_id: user.id,
        p_type: type,
        p_amount: amount,
      });

      if (error) throw error;

      // Parse the JSON response from the RPC function
      const result = data as { success: boolean; error?: string; new_value?: number; limit?: number; remaining?: number };

      if (!result.success) {
        throw new Error(result.error || 'Failed to increment usage');
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-subscription'] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update usage');
    },
  });

  return {
    plans: plansQuery.data ?? [],
    subscription: subscriptionQuery.data,
    isLoading: plansQuery.isLoading || subscriptionQuery.isLoading,
    checkUsageLimit,
    getUsagePercentage,
    isExpiringSoon,
    incrementUsage,
  };
};
