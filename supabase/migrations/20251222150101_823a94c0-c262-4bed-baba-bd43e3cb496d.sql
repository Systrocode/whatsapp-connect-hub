-- Fix 1: Add missing INSERT policy for user_subscriptions
CREATE POLICY "Users can create their own subscription"
ON public.user_subscriptions
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Fix 2: Create server-side RPC functions for admin operations

-- Function to update user role (with admin validation and audit logging)
CREATE OR REPLACE FUNCTION public.admin_update_user_role(
  p_user_id UUID,
  p_new_role app_role
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_existing_id UUID;
BEGIN
  -- Verify caller is admin
  IF NOT has_role(auth.uid(), 'admin') THEN
    RETURN json_build_object('success', false, 'error', 'Admin access required');
  END IF;
  
  -- Prevent self-demotion from admin (protection against lockout)
  IF p_user_id = auth.uid() AND p_new_role != 'admin' THEN
    RETURN json_build_object('success', false, 'error', 'Cannot change your own admin role');
  END IF;
  
  -- Check if user already has a role entry
  SELECT id INTO v_existing_id
  FROM user_roles
  WHERE user_id = p_user_id;
  
  IF v_existing_id IS NOT NULL THEN
    -- Update existing role
    UPDATE user_roles
    SET role = p_new_role
    WHERE user_id = p_user_id;
  ELSE
    -- Insert new role
    INSERT INTO user_roles (user_id, role)
    VALUES (p_user_id, p_new_role);
  END IF;
  
  -- Log admin action
  INSERT INTO usage_logs (user_id, action_type, metadata)
  VALUES (auth.uid(), 'admin_role_change', json_build_object(
    'target_user_id', p_user_id,
    'new_role', p_new_role
  ));
  
  RETURN json_build_object('success', true, 'user_id', p_user_id, 'new_role', p_new_role);
END;
$$;

-- Function to approve/reject template (with admin validation)
CREATE OR REPLACE FUNCTION public.admin_approve_template(
  p_template_id UUID,
  p_approve BOOLEAN
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Verify caller is admin
  IF NOT has_role(auth.uid(), 'admin') THEN
    RETURN json_build_object('success', false, 'error', 'Admin access required');
  END IF;
  
  -- Update template approval status
  UPDATE message_templates
  SET is_approved = p_approve, updated_at = now()
  WHERE id = p_template_id;
  
  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'error', 'Template not found');
  END IF;
  
  -- Log admin action
  INSERT INTO usage_logs (user_id, action_type, metadata)
  VALUES (auth.uid(), 'admin_template_approval', json_build_object(
    'template_id', p_template_id,
    'approved', p_approve
  ));
  
  RETURN json_build_object('success', true, 'template_id', p_template_id, 'approved', p_approve);
END;
$$;

-- Function to delete template (with admin validation)
CREATE OR REPLACE FUNCTION public.admin_delete_template(
  p_template_id UUID
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_template_name TEXT;
BEGIN
  -- Verify caller is admin
  IF NOT has_role(auth.uid(), 'admin') THEN
    RETURN json_build_object('success', false, 'error', 'Admin access required');
  END IF;
  
  -- Get template name for logging before deletion
  SELECT name INTO v_template_name
  FROM message_templates
  WHERE id = p_template_id;
  
  IF v_template_name IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'Template not found');
  END IF;
  
  -- Delete the template
  DELETE FROM message_templates
  WHERE id = p_template_id;
  
  -- Log admin action
  INSERT INTO usage_logs (user_id, action_type, metadata)
  VALUES (auth.uid(), 'admin_template_delete', json_build_object(
    'template_id', p_template_id,
    'template_name', v_template_name
  ));
  
  RETURN json_build_object('success', true, 'template_id', p_template_id);
END;
$$;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION public.admin_update_user_role TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_approve_template TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_delete_template TO authenticated;