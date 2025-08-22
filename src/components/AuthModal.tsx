import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Leaf, Shield, LogIn, UserPlus } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
}

const AuthModal = ({ isOpen, onClose, onAuthSuccess }: AuthModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        toast({
          title: "Error de inicio de sesión",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      if (data.user) {
        // Check if user is admin
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (profileError) {
          await supabase.auth.signOut();
          toast({
            title: "Error de perfil",
            description: "No se pudo verificar el perfil del usuario. Es posible que no tengas un perfil de administrador configurado.",
            variant: "destructive"
          });
          return;
        }

        if (!profile || profile.role !== 'admin') {
          await supabase.auth.signOut();
          toast({
            title: "Acceso denegado",
            description: `Tu rol actual es "${profile?.role || 'sin rol'}". Solo los usuarios con rol "admin" pueden acceder al panel de administración.`,
            variant: "destructive"
          });
          return;
        }

        toast({
          title: "¡Bienvenido Administrador!",
          description: "Acceso al panel de administración autorizado.",
        });
        onAuthSuccess();
        onClose();
        
        // Redirect to admin dashboard
        window.location.href = "/admin";
      }
    } catch (error) {
      toast({
        title: "Error inesperado",
        description: "Ocurrió un problema al iniciar sesión.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
        resetForm();
      }
    }}>
      <DialogContent className="sm:max-w-md p-0">
        <Card className="border-0 shadow-none">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-primary">PagoCampo</CardTitle>
                <p className="text-sm text-muted-foreground">Panel de Administración</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Acceso seguro para administradores</span>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4 mt-6">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold">Acceso de Administrador</h3>
                <p className="text-sm text-muted-foreground">
                  Solo para administradores autorizados
                </p>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Correo electrónico</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="admin@pagocampo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="login-password">Contraseña</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading || !email || !password}
                >
                  {isLoading ? "Verificando acceso..." : "Acceder al Panel"}
                </Button>
              </form>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground">
                Al acceder, aceptas los términos de servicio y políticas de privacidad de PagoCampo.
              </p>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;