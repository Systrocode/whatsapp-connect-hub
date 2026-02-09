-- Allow admins to view all profiles
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to view all message templates
CREATE POLICY "Admins can view all templates"
ON public.message_templates
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to update all message templates (for approval)
CREATE POLICY "Admins can update all templates"
ON public.message_templates
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete all message templates
CREATE POLICY "Admins can delete all templates"
ON public.message_templates
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to view all user roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));