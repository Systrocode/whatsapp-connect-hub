-- Create profiles table if it doesn't exist (it should, but just in case)
-- (We are assuming it exists based on previous context, so we focus on POLICIES)

-- Enable RLS on profiles if not already enabled
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_class c
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE c.relname = 'profiles'
        AND n.nspname = 'public'
        AND c.relrowsecurity = true
    ) THEN
        ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- Drop existing insert policy if it exists to avoid conflicts
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

-- Create the insert policy
CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- Ensure authenticated users can update their own profile
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id);

-- Ensure users can read their own profile
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);
