-- Fix Security Warnings: Set explicit search_path for SECURITY DEFINER functions

-- 1. accept_team_invite (argument is text, not uuid)
ALTER FUNCTION public.accept_team_invite(text) SET search_path = public;

-- 2. delete_user_by_admin (verify argument type, likely uuid)
ALTER FUNCTION public.delete_user_by_admin(uuid) SET search_path = public;

-- 3. generate_invoice_number (no args)
ALTER FUNCTION public.generate_invoice_number() SET search_path = public;

-- 4. get_invite_details (argument is text, not uuid)
ALTER FUNCTION public.get_invite_details(text) SET search_path = public;
