-- Subscription Plans table
CREATE TABLE public.subscription_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price_monthly decimal(10,2) NOT NULL DEFAULT 0,
  price_yearly decimal(10,2),
  message_limit integer NOT NULL DEFAULT 100,
  contact_limit integer NOT NULL DEFAULT 50,
  features jsonb DEFAULT '[]'::jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- User Subscriptions table
CREATE TABLE public.user_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  plan_id uuid REFERENCES public.subscription_plans(id),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled', 'trial')),
  payment_gateway text DEFAULT 'razorpay',
  gateway_subscription_id text,
  gateway_customer_id text,
  current_period_start timestamptz NOT NULL DEFAULT now(),
  current_period_end timestamptz NOT NULL,
  messages_used integer DEFAULT 0,
  contacts_used integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Usage Logs for tracking
CREATE TABLE public.usage_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  action_type text NOT NULL,
  quantity integer DEFAULT 1,
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Broadcast Campaigns table
CREATE TABLE public.broadcast_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  template_id uuid REFERENCES public.message_templates(id),
  message_content text,
  segment_filter jsonb DEFAULT '{}'::jsonb,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'completed', 'failed', 'cancelled')),
  scheduled_at timestamptz,
  sent_at timestamptz,
  total_recipients integer DEFAULT 0,
  sent_count integer DEFAULT 0,
  delivered_count integer DEFAULT 0,
  failed_count integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Broadcast Recipients table
CREATE TABLE public.broadcast_recipients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES public.broadcast_campaigns(id) ON DELETE CASCADE,
  contact_id uuid REFERENCES public.contacts(id) ON DELETE CASCADE,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'failed')),
  sent_at timestamptz,
  error_message text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.broadcast_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.broadcast_recipients ENABLE ROW LEVEL SECURITY;

-- Subscription Plans policies (public read, admin write)
CREATE POLICY "Anyone can view active plans" ON public.subscription_plans
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage plans" ON public.subscription_plans
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- User Subscriptions policies
CREATE POLICY "Users can view their own subscription" ON public.user_subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscription" ON public.user_subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all subscriptions" ON public.user_subscriptions
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage all subscriptions" ON public.user_subscriptions
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Usage Logs policies
CREATE POLICY "Users can view their own usage" ON public.usage_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own usage" ON public.usage_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all usage" ON public.usage_logs
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Broadcast Campaigns policies
CREATE POLICY "Users can manage their own campaigns" ON public.broadcast_campaigns
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all campaigns" ON public.broadcast_campaigns
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Broadcast Recipients policies
CREATE POLICY "Users can manage recipients of their campaigns" ON public.broadcast_recipients
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.broadcast_campaigns bc 
      WHERE bc.id = campaign_id AND bc.user_id = auth.uid()
    )
  );

-- Create updated_at triggers
CREATE TRIGGER update_subscription_plans_updated_at
  BEFORE UPDATE ON public.subscription_plans
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_subscriptions_updated_at
  BEFORE UPDATE ON public.user_subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_broadcast_campaigns_updated_at
  BEFORE UPDATE ON public.broadcast_campaigns
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default plans
INSERT INTO public.subscription_plans (name, description, price_monthly, price_yearly, message_limit, contact_limit, features)
VALUES 
  ('Free', 'Basic plan for getting started', 0, 0, 100, 50, '["Basic messaging", "Up to 50 contacts"]'),
  ('Starter', 'For small businesses', 499, 4990, 1000, 500, '["1000 messages/month", "500 contacts", "Broadcast campaigns", "Scheduled messages"]'),
  ('Professional', 'For growing businesses', 1499, 14990, 5000, 2000, '["5000 messages/month", "2000 contacts", "Advanced analytics", "Priority support", "Segment campaigns"]'),
  ('Enterprise', 'For large organizations', 4999, 49990, 50000, 10000, '["50000 messages/month", "10000 contacts", "Dedicated support", "Custom integrations", "API access"]');