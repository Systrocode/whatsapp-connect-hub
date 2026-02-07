-- Create a trigger to automatically create a profile for new users (Email or Google)
-- This prevents the "missing profile" issue which can cause login loops.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  -- Insert into profiles
  -- We use ON CONFLICT DO NOTHING in case the profile was already created by another method
  insert into public.profiles (id, created_at)
  values (new.id, now())
  on conflict (id) do nothing;

  -- Insert into user_roles (default to 'user')
  insert into public.user_roles (user_id, role)
  values (new.id, 'user')
  on conflict (user_id) do nothing;

  return new;
end;
$$;

-- Register trigger on auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
