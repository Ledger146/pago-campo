-- SOLUCIÓN: Arreglar políticas RLS para permitir registro público pero proteger lectura

-- 1. Eliminar la política INSERT restrictiva actual
DROP POLICY IF EXISTS "Allow public insert for usuarios" ON public.usuarios;

-- 2. Crear nueva política INSERT más permisiva para registro público
CREATE POLICY "Allow public registration" 
ON public.usuarios 
FOR INSERT 
TO PUBLIC
WITH CHECK (true);  -- Permite inserción sin restricciones

-- 3. Mantener la política SELECT restrictiva (esta está bien)
-- La política "Users can only view their own data" ya está funcionando correctamente

-- 4. Verificar que RLS esté habilitado
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;