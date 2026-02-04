-- Fix final "Auth RLS Initialization Plan" warning for Posts
-- Wrap auth.role() and auth.uid() in subqueries to prevent per-row evaluation

DROP POLICY IF EXISTS "Everyone can view published or admin posts" ON public.posts;

CREATE POLICY "Everyone can view published or admin posts" ON public.posts FOR SELECT USING (
  published = true 
  OR (
    (select auth.role()) = 'authenticated' 
    AND (
      EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = (select auth.uid()) 
        AND role = 'admin'
      )
      OR (
        select email from auth.users 
        where id = (select auth.uid())
      ) = 'harsh.tank@systrocode.tech'
    )
  )
);
