-- Remove the current insecure policy
DROP POLICY IF EXISTS "Users can view their own record" ON public.usuarios;

-- Create a security definer function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Create new secure policies for usuarios table
-- Only admins can view all usuario records (for lead management)
CREATE POLICY "Only admins can view usuarios" 
ON public.usuarios 
FOR SELECT 
TO authenticated
USING (public.is_current_user_admin());

-- Users can view their own submissions by email match
CREATE POLICY "Users can view their own submissions" 
ON public.usuarios 
FOR SELECT 
TO authenticated
USING (auth.email() = email);

-- Keep the public insert policy for lead capture
-- (This already exists and is correct)