-- Primero, vamos a deshabilitar el trigger problemático que está causando el error
-- El error indica que hay un trigger que trata de usar net.http_post pero el schema 'net' no existe

-- Verificar y eliminar triggers problemáticos
DROP TRIGGER IF EXISTS notify_new_user_trigger ON public.usuarios;

-- Eliminar la función problemática
DROP FUNCTION IF EXISTS public.notify_new_user();

-- Asegurar que RLS está habilitado en las tablas necesarias
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eventos ENABLE ROW LEVEL SECURITY;  
ALTER TABLE public.descargas ENABLE ROW LEVEL SECURITY;

-- Crear políticas básicas para permitir inserción pública en usuarios
-- (ya existe una política de INSERT, pero verificamos que esté funcionando)
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