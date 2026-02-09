-- Force RLS enforcement on both tables to ensure policies are always applied
-- This ensures that even table owners must follow RLS policies

ALTER TABLE public.profiles FORCE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles FORCE ROW LEVEL SECURITY;