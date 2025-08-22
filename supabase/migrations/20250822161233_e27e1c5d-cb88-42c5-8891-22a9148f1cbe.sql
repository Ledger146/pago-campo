-- Enable RLS on usuarios table with proper policies
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;

-- Allow public insert for usuarios (for lead capture)
CREATE POLICY "Allow public insert on usuarios" 
ON public.usuarios 
FOR INSERT 
WITH CHECK (true);

-- Allow authenticated users to view their own records
CREATE POLICY "Users can view their own record" 
ON public.usuarios 
FOR SELECT 
USING (auth.uid() IS NOT NULL);