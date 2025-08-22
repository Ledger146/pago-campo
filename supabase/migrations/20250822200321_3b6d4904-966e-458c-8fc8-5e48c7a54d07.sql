-- Fix RLS policy for usuarios table to allow anonymous insertions
DROP POLICY IF EXISTS "Allow public insert on usuarios" ON public.usuarios;

-- Create a new policy that allows anonymous users to insert
CREATE POLICY "Allow anonymous insert on usuarios" 
ON public.usuarios 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);