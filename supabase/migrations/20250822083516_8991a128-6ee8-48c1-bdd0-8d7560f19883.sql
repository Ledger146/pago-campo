-- Arreglar el warning de search_path en la función is_admin_user
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean AS $$
BEGIN
  -- Por ahora retorna false, se puede extender cuando se implemente autenticación
  RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;