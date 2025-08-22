-- CRÍTICO: Proteger datos personales sensibles con políticas RLS restrictivas

-- 1. USUARIOS: Permitir solo lectura autenticada de datos propios
-- Eliminar acceso público a lectura de datos personales
CREATE POLICY "Users can only view their own data" 
ON public.usuarios 
FOR SELECT 
TO authenticated 
USING (auth.uid()::text = id::text);

-- Política para administradores (si se necesita en el futuro)
-- Crear función para verificar rol de admin de forma segura
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean AS $$
BEGIN
  -- Por ahora retorna false, se puede extender cuando se implemente autenticación
  RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- 2. DESCARGAS: Proteger historial de descargas y emails
CREATE POLICY "Restrict download records access" 
ON public.descargas 
FOR SELECT 
TO authenticated 
USING (
  -- Solo admins o el propio usuario puede ver sus descargas
  public.is_admin_user() OR 
  email = (
    SELECT email FROM public.usuarios 
    WHERE id = auth.uid()
  )
);

-- 3. EVENTOS: Proteger datos de actividad de usuarios
CREATE POLICY "Restrict user activity data access" 
ON public.eventos 
FOR SELECT 
TO authenticated 
USING (
  -- Solo admins pueden ver eventos por ahora
  public.is_admin_user() OR
  usuario_id = auth.uid()
);

-- Mantener las políticas INSERT existentes para registro público
-- No modificamos las políticas INSERT para no romper el registro de usuarios