-- Create table to store Google OAuth tokens
CREATE TABLE public.google_oauth_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.google_oauth_tokens ENABLE ROW LEVEL SECURITY;

-- Users can only manage their own tokens
CREATE POLICY "Users can view own tokens" ON public.google_oauth_tokens
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tokens" ON public.google_oauth_tokens
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tokens" ON public.google_oauth_tokens
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tokens" ON public.google_oauth_tokens
  FOR DELETE USING (auth.uid() = user_id);

-- Add trigger for updated_at
CREATE TRIGGER update_google_oauth_tokens_updated_at
  BEFORE UPDATE ON public.google_oauth_tokens
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();