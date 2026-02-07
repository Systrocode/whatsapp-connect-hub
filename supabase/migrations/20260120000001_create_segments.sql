
-- Create segments table
CREATE TABLE IF NOT EXISTS public.segments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    criteria JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS Policies
ALTER TABLE public.segments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own segments"
    ON public.segments
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own segments"
    ON public.segments
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own segments"
    ON public.segments
    FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own segments"
    ON public.segments
    FOR DELETE
    USING (auth.uid() = user_id);
