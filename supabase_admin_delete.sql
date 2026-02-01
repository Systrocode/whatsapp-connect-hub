-- Function to allow admins to delete users
-- This function deletes the user from auth.users, which cascades to public tables if configured correctly.
-- If not configured with ON DELETE CASCADE, manual deletion might be needed here.

create or replace function delete_user_by_admin(target_user_id uuid)
returns void
language plpgsql
security definer
as $$
declare
  is_admin boolean;
begin
  -- Check if the executor is an admin
  select exists (
    select 1 from public.user_roles 
    where user_id = auth.uid() 
    and role = 'admin'
  ) into is_admin;

  if not is_admin then
    raise exception 'Access denied: Only admins can perform this action';
  end if;

  -- Prevent deleting yourself (optional safety)
  if target_user_id = auth.uid() then
    raise exception 'Cannot delete your own admin account';
  end if;

  -- Delete from auth.users (This requires the function to be SECURITY DEFINER)
  -- Note: Supabase usually sets up CASCADE delete on the auth.users id
  -- So profiles, user_roles, etc. should be deleted automatically.
  delete from auth.users where id = target_user_id;

end;
$$;
