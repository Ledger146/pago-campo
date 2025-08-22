-- Update the existing user to have admin role
UPDATE public.profiles 
SET role = 'admin', updated_at = now()
WHERE email = 'ledger_146@gmail.com';