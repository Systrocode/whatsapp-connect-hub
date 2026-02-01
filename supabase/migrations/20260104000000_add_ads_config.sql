ALTER TABLE public.whatsapp_settings ADD COLUMN IF NOT EXISTS ad_account_id text;
ALTER TABLE public.whatsapp_settings ADD COLUMN IF NOT EXISTS fb_user_access_token text;
