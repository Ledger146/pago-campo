-- Eliminar la función problemática junto con sus dependencias
DROP FUNCTION IF EXISTS public.notify_new_user() CASCADE;

-- Asegurar que RLS está habilitado en las tablas necesarias
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eventos ENABLE ROW LEVEL SECURITY;  
ALTER TABLE public.descargas ENABLE ROW LEVEL SECURITY;

-- Crear políticas básicas para permitir inserción pública en usuarios
DROP POLICY IF EXISTS "Allow insert for all" ON public.usuarios;

CREATE POLICY "Allow public insert for usuarios" 
ON public.usuarios 
FOR INSERT 
TO PUBLIC 
WITH CHECK (true);

-- Política para permitir inserción pública en eventos
DROP POLICY IF EXISTS "Allow public insert for eventos" ON public.eventos;

CREATE POLICY "Allow public insert for eventos" 
ON public.eventos 
FOR INSERT 
TO PUBLIC 
WITH CHECK (true);

-- Política para permitir inserción pública en descargas
DROP POLICY IF EXISTS "Allow public insert for descargas" ON public.descargas;

CREATE POLICY "Allow public insert for descargas" 
ON public.descargas 
FOR INSERT 
TO PUBLIC 
WITH CHECK (true);