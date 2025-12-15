-- Add user_id column to track ownership
ALTER TABLE public.moments 
ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- Set default value for new inserts
ALTER TABLE public.moments 
ALTER COLUMN user_id SET DEFAULT auth.uid();

-- Drop overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can update moments" ON public.moments;
DROP POLICY IF EXISTS "Authenticated users can delete moments" ON public.moments;
DROP POLICY IF EXISTS "Authenticated users can create moments" ON public.moments;

-- Create owner-scoped policies
CREATE POLICY "Users can create own moments"
ON public.moments FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own moments"
ON public.moments FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own moments"
ON public.moments FOR DELETE
TO authenticated
USING (auth.uid() = user_id);