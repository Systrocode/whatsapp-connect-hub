-- Create campaigns table for Meta Ads
CREATE TABLE public.campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  objective TEXT NOT NULL DEFAULT 'OUTCOME_ENGAGEMENT',
  status TEXT NOT NULL DEFAULT 'draft',
  daily_budget NUMERIC(10, 2),
  lifetime_budget NUMERIC(10, 2),
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  meta_campaign_id TEXT,
  meta_adset_id TEXT,
  meta_ad_id TEXT,
  targeting JSONB DEFAULT '{}'::jsonb,
  creative JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create campaign_leads table for tracking leads from Click-to-WhatsApp ads
CREATE TABLE public.campaign_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
  phone_number TEXT NOT NULL,
  name TEXT,
  source TEXT DEFAULT 'ctwa_ad',
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ad_performance table for caching metrics
CREATE TABLE public.ad_performance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  spend NUMERIC(10, 2) DEFAULT 0,
  reach INTEGER DEFAULT 0,
  ctr NUMERIC(5, 4) DEFAULT 0,
  cpc NUMERIC(10, 2) DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(campaign_id, date)
);

-- Enable RLS on all tables
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ad_performance ENABLE ROW LEVEL SECURITY;

-- Campaigns policies
CREATE POLICY "Users can view their own campaigns" ON public.campaigns
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own campaigns" ON public.campaigns
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own campaigns" ON public.campaigns
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own campaigns" ON public.campaigns
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all campaigns" ON public.campaigns
  FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

-- Campaign leads policies
CREATE POLICY "Users can view leads for their campaigns" ON public.campaign_leads
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.campaigns c 
      WHERE c.id = campaign_leads.campaign_id AND c.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert leads for their campaigns" ON public.campaign_leads
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.campaigns c 
      WHERE c.id = campaign_leads.campaign_id AND c.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete leads for their campaigns" ON public.campaign_leads
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.campaigns c 
      WHERE c.id = campaign_leads.campaign_id AND c.user_id = auth.uid()
    )
  );

-- Ad performance policies
CREATE POLICY "Users can view performance for their campaigns" ON public.ad_performance
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.campaigns c 
      WHERE c.id = ad_performance.campaign_id AND c.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage performance for their campaigns" ON public.ad_performance
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.campaigns c 
      WHERE c.id = ad_performance.campaign_id AND c.user_id = auth.uid()
    )
  );

-- Create triggers for updated_at
CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON public.campaigns
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ad_performance_updated_at
  BEFORE UPDATE ON public.ad_performance
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_campaigns_user_id ON public.campaigns(user_id);
CREATE INDEX idx_campaigns_status ON public.campaigns(status);
CREATE INDEX idx_campaigns_meta_campaign_id ON public.campaigns(meta_campaign_id);
CREATE INDEX idx_campaign_leads_campaign_id ON public.campaign_leads(campaign_id);
CREATE INDEX idx_ad_performance_campaign_id ON public.ad_performance(campaign_id);
CREATE INDEX idx_ad_performance_date ON public.ad_performance(date);