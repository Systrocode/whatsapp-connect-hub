ALTER TABLE public.message_templates
ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'en_US';
