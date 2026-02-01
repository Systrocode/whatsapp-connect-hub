-- Redefine handle_new_user to be fault-tolerant
-- This prevents "Database error saving new user" if profile/role creation fails

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Attempt to create profile
  BEGIN
    INSERT INTO public.profiles (id, business_name, phone_number)
    VALUES (
      NEW.id,
      NEW.raw_user_meta_data ->> 'business_name',
      NEW.raw_user_meta_data ->> 'phone_number'
    )
    ON CONFLICT (id) DO NOTHING;
  EXCEPTION WHEN OTHERS THEN
    -- If profile creation fails, we still want the user to be created in Auth
    RAISE WARNING 'Profile creation failed for user %: %', NEW.id, SQLERRM;
  END;

  -- Attempt to assign default role
  BEGIN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'user')
    ON CONFLICT (user_id, role) DO NOTHING;
  EXCEPTION WHEN OTHERS THEN
    -- If role assignment fails, we still want the user to be created
    RAISE WARNING 'Role assignment failed for user %: %', NEW.id, SQLERRM;
  END;
  
  RETURN NEW;
END;
$$;
