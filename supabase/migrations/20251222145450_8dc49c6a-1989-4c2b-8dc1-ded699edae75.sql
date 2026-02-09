-- Fix 1: Add CHECK constraints for input validation on key tables

-- Contacts table constraints
ALTER TABLE public.contacts 
ADD CONSTRAINT contacts_phone_number_length CHECK (length(phone_number) >= 1 AND length(phone_number) <= 20),
ADD CONSTRAINT contacts_email_length CHECK (email IS NULL OR (length(email) >= 5 AND length(email) <= 255)),
ADD CONSTRAINT contacts_name_length CHECK (name IS NULL OR length(name) <= 100),
ADD CONSTRAINT contacts_notes_length CHECK (notes IS NULL OR length(notes) <= 5000);

-- Profiles table constraints (allow empty string for backward compatibility)
ALTER TABLE public.profiles
ADD CONSTRAINT profiles_business_name_length CHECK (business_name IS NULL OR length(business_name) <= 100),
ADD CONSTRAINT profiles_phone_number_length CHECK (phone_number IS NULL OR length(phone_number) <= 20);

-- Message templates constraints
ALTER TABLE public.message_templates
ADD CONSTRAINT templates_name_length CHECK (length(name) >= 1 AND length(name) <= 100),
ADD CONSTRAINT templates_content_length CHECK (length(content) >= 1 AND length(content) <= 10000);

-- Messages constraints
ALTER TABLE public.messages
ADD CONSTRAINT messages_content_length CHECK (length(content) >= 1 AND length(content) <= 10000);

-- Broadcast campaigns constraints
ALTER TABLE public.broadcast_campaigns
ADD CONSTRAINT campaigns_name_length CHECK (length(name) >= 1 AND length(name) <= 100);

-- User subscriptions constraints - prevent negative values
ALTER TABLE public.user_subscriptions
ADD CONSTRAINT subscriptions_messages_used_positive CHECK (messages_used IS NULL OR messages_used >= 0),
ADD CONSTRAINT subscriptions_contacts_used_positive CHECK (contacts_used IS NULL OR contacts_used >= 0);

-- Fix 2: Create atomic server-side function for incrementing usage
CREATE OR REPLACE FUNCTION public.increment_usage(
  p_user_id UUID,
  p_type TEXT,
  p_amount INTEGER DEFAULT 1
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_subscription RECORD;
  v_limit INTEGER;
  v_current INTEGER;
  v_new_value INTEGER;
BEGIN
  -- Validate type parameter
  IF p_type NOT IN ('messages', 'contacts') THEN
    RETURN json_build_object('success', false, 'error', 'Invalid type. Must be messages or contacts');
  END IF;
  
  -- Validate amount
  IF p_amount < 1 OR p_amount > 1000 THEN
    RETURN json_build_object('success', false, 'error', 'Invalid amount. Must be between 1 and 1000');
  END IF;
  
  -- Get the user's subscription with plan details (lock for update to prevent race conditions)
  SELECT us.*, sp.message_limit, sp.contact_limit
  INTO v_subscription
  FROM user_subscriptions us
  LEFT JOIN subscription_plans sp ON us.plan_id = sp.id
  WHERE us.user_id = p_user_id
  FOR UPDATE;
  
  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'error', 'No subscription found');
  END IF;
  
  -- Check subscription status
  IF v_subscription.status NOT IN ('active', 'trial') THEN
    RETURN json_build_object('success', false, 'error', 'Subscription is not active');
  END IF;
  
  -- Determine field and limit based on type
  IF p_type = 'messages' THEN
    v_limit := COALESCE(v_subscription.message_limit, 100);
    v_current := COALESCE(v_subscription.messages_used, 0);
  ELSE
    v_limit := COALESCE(v_subscription.contact_limit, 50);
    v_current := COALESCE(v_subscription.contacts_used, 0);
  END IF;
  
  -- Check if within limits
  v_new_value := v_current + p_amount;
  IF v_new_value > v_limit THEN
    RETURN json_build_object(
      'success', false, 
      'error', 'Usage limit exceeded',
      'current', v_current,
      'limit', v_limit,
      'requested', p_amount
    );
  END IF;
  
  -- Atomically update the usage
  IF p_type = 'messages' THEN
    UPDATE user_subscriptions 
    SET messages_used = v_new_value, updated_at = now()
    WHERE user_id = p_user_id;
  ELSE
    UPDATE user_subscriptions 
    SET contacts_used = v_new_value, updated_at = now()
    WHERE user_id = p_user_id;
  END IF;
  
  -- Log the usage
  INSERT INTO usage_logs (user_id, action_type, quantity)
  VALUES (p_user_id, CASE WHEN p_type = 'messages' THEN 'message_sent' ELSE 'contact_added' END, p_amount);
  
  RETURN json_build_object(
    'success', true,
    'new_value', v_new_value,
    'limit', v_limit,
    'remaining', v_limit - v_new_value
  );
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.increment_usage TO authenticated;