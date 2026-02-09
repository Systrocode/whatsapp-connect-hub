-- Function to update total_earnings in affiliates table
CREATE OR REPLACE FUNCTION public.update_affiliate_earnings()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- If a referral is updated to have a commission amount
  IF (TG_OP = 'UPDATE' OR TG_OP = 'INSERT') THEN
    UPDATE public.affiliates
    SET total_earnings = (
      SELECT COALESCE(SUM(commission_amount), 0)
      FROM public.referrals
      WHERE affiliate_id = NEW.affiliate_id
      AND status IN ('converted', 'paid') 
    )
    WHERE id = NEW.affiliate_id;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Trigger for the function
DROP TRIGGER IF EXISTS on_referral_change ON public.referrals;
CREATE TRIGGER on_referral_change
AFTER INSERT OR UPDATE OF status, commission_amount ON public.referrals
FOR EACH ROW
EXECUTE FUNCTION public.update_affiliate_earnings();

-- Allow admins to view all affiliate data
CREATE POLICY "Admins can view all affiliates"
  ON public.affiliates
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
  );
