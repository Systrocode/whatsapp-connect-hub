-- Optimizing Foreign Keys by adding Indexes
-- This fixes "Unindexed foreign keys" warnings

-- 1. Affiliates
CREATE INDEX IF NOT EXISTS idx_affiliates_user_id ON public.affiliates(user_id);

-- 2. Broadcast Campaigns
CREATE INDEX IF NOT EXISTS idx_broadcast_campaigns_template_id ON public.broadcast_campaigns(template_id);

-- 3. Broadcast Recipients
CREATE INDEX IF NOT EXISTS idx_broadcast_recipients_campaign_id ON public.broadcast_recipients(campaign_id);
CREATE INDEX IF NOT EXISTS idx_broadcast_recipients_contact_id ON public.broadcast_recipients(contact_id);

-- 4. Campaign Leads
CREATE INDEX IF NOT EXISTS idx_campaign_leads_contact_id ON public.campaign_leads(contact_id);

-- 5. Conversations
CREATE INDEX IF NOT EXISTS idx_conversations_contact_id ON public.conversations(contact_id);

-- 6. Flows
CREATE INDEX IF NOT EXISTS idx_flows_user_id ON public.flows(user_id);

-- 7. Invoices
CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON public.invoices(user_id);

-- 8. Messages
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON public.messages(conversation_id);

-- 9. Payouts
CREATE INDEX IF NOT EXISTS idx_payouts_affiliate_id ON public.payouts(affiliate_id);

-- 10. Referrals
CREATE INDEX IF NOT EXISTS idx_referrals_affiliate_id ON public.referrals(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referred_user_id ON public.referrals(referred_user_id);

-- 11. Segments
CREATE INDEX IF NOT EXISTS idx_segments_user_id ON public.segments(user_id);

-- 12. Team Invites
CREATE INDEX IF NOT EXISTS idx_team_invites_created_by ON public.team_invites(created_by);
CREATE INDEX IF NOT EXISTS idx_team_invites_team_id ON public.team_invites(team_id);

-- 13. Team Members
CREATE INDEX IF NOT EXISTS idx_team_members_user_id ON public.team_members(user_id);

-- 14. Teams
CREATE INDEX IF NOT EXISTS idx_teams_owner_id ON public.teams(owner_id);

-- 15. User Subscriptions
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_plan_id ON public.user_subscriptions(plan_id);

-- 16. WhatsApp Clients
CREATE INDEX IF NOT EXISTS idx_whatsapp_clients_user_id ON public.whatsapp_clients(user_id);
