-- ARREGLAR SOLO LAS POLÍTICAS RLS (el OTP warning es un setting de Supabase)

-- 1. ELIMINAR TODAS LAS POLÍTICAS RLS PROBLEMÁTICAS
DROP POLICY IF EXISTS "Allow public registration" ON public.usuarios;
DROP POLICY IF EXISTS "Users can only view their own data" ON public.usuarios;
DROP POLICY IF EXISTS "Allow public insert for eventos" ON public.eventos;
DROP POLICY IF EXISTS "Restrict user activity data access" ON public.eventos;
DROP POLICY IF EXISTS "Allow public insert for descargas" ON public.descargas;
DROP POLICY IF EXISTS "Restrict download records access" ON public.descargas;

-- 2. DESHABILITAR RLS EN LA TABLA USUARIOS TEMPORALMENTE
-- Esto permite acceso completo hasta que se implemente autenticación
ALTER TABLE public.usuarios DISABLE ROW LEVEL SECURITY;

-- 3. CONFIGURAR RLS EN OTRAS TABLAS CON POLÍTICAS SIMPLES
ALTER TABLE public.eventos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.descargas ENABLE ROW LEVEL SECURITY;

-- Políticas simples: solo INSERT público
CREATE POLICY "Allow public event logging" 
ON public.eventos 
FOR INSERT 
TO PUBLIC
WITH CHECK (true);

CREATE POLICY "Allow public download tracking" 
ON public.descargas 
FOR INSERT 
TO PUBLIC
WITH CHECK (true);