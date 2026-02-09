-- Add payment_details column to affiliates table
ALTER TABLE public.affiliates 
ADD COLUMN IF NOT EXISTS payment_details JSONB DEFAULT '{}'::jsonb;

-- Update handle_new_user to process referrals
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  ref_code text;
  aff_id uuid;
BEGIN
  -- 1. Create Profile (Existing Logic)
  BEGIN
    INSERT INTO public.profiles (id, business_name, phone_number)
    VALUES (
      NEW.id,
      NEW.raw_user_meta_data ->> 'business_name',
      NEW.raw_user_meta_data ->> 'phone_number'
    )
    ON CONFLICT (id) DO NOTHING;
  EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'Profile creation failed for user %: %', NEW.id, SQLERRM;
  END;

  -- 2. Assign Role (Existing Logic)
  BEGIN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'user')
    ON CONFLICT (user_id, role) DO NOTHING;
  EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'Role assignment failed for user %: %', NEW.id, SQLERRM;
  END;

  -- 3. Process Referral (New Logic)
  BEGIN
    ref_code := NEW.raw_user_meta_data ->> 'affiliate_ref';
    
    IF ref_code IS NOT NULL THEN
      -- Find the affiliate ID based on the code
      SELECT id INTO aff_id FROM public.affiliates WHERE referral_code = ref_code;
      
      -- If functionality exists and it's not the user referring themselves
      IF aff_id IS NOT NULL THEN
        -- Check if user is not referring themselves (prevents self-referral via different email if we tracked IP content, but basic check is usually diff user_ids which is implicit here as new user vs existing affiliate owner)
        -- We check if the affiliate's user_id is NOT the new user's id (unlikely but possible in edge cases)
        IF NOT EXISTS (SELECT 1 FROM public.affiliates WHERE id = aff_id AND user_id = NEW.id) THEN
            INSERT INTO public.referrals (affiliate_id, referred_user_id, status)
            VALUES (aff_id, NEW.id, 'pending')
            ON CONFLICT DO NOTHING;
        END IF;
      END IF;
    END IF;
  EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'Referral processing failed for user %: %', NEW.id, SQLERRM;
  END;
  
  RETURN NEW;
END;
$$;
