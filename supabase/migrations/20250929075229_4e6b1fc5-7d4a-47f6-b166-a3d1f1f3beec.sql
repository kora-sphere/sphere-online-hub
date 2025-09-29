-- Fix profiles table public exposure issue
-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

-- Create a more restrictive SELECT policy
-- Users can only view their own profile, admins/staff can view all profiles
CREATE POLICY "Users can view own profile or admins can view all" 
ON public.profiles 
FOR SELECT 
USING (
  auth.uid() = id 
  OR EXISTS (
    SELECT 1 
    FROM profiles admin_profile
    WHERE admin_profile.id = auth.uid() 
    AND admin_profile.role IN ('admin'::user_role, 'staff'::user_role)
  )
);