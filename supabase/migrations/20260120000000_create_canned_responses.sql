
-- Create canned_responses table
CREATE TABLE IF NOT EXISTS public.canned_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    shortcut TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, shortcut)
);

-- RLS Policies
ALTER TABLE public.canned_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own canned responses"
    ON public.canned_responses
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own canned responses"
    ON public.canned_responses
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own canned responses"
    ON public.canned_responses
    FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own canned responses"
    ON public.canned_responses
    FOR DELETE
    USING (auth.uid() = user_id);

-- Add some default responses for new users (optional, can be done via a trigger or just let them be empty)
