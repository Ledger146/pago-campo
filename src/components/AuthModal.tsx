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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activeTab, setActiveTab] = useState("login");
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
        toast({
          title: "¡Bienvenido!",
          description: "Has iniciado sesión correctamente.",
        });
        onAuthSuccess();
        onClose();
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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Error de registro",
        description: "Las contraseñas no coinciden.",
        variant: "destructive"
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error de registro",
        description: "La contraseña debe tener al menos 6 caracteres.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          emailRedirectTo: redirectUrl
        }
      });

      if (error) {
        toast({
          title: "Error de registro",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      if (data.user) {
        toast({
          title: "¡Registro exitoso!",
          description: "Revisa tu email para confirmar tu cuenta.",
        });
        
        // Auto switch to login tab
        setActiveTab("login");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      toast({
        title: "Error inesperado",
        description: "Ocurrió un problema al registrarte.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setActiveTab("login");
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
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" className="space-x-2">
                  <LogIn className="h-4 w-4" />
                  <span>Iniciar Sesión</span>
                </TabsTrigger>
                <TabsTrigger value="register" className="space-x-2">
                  <UserPlus className="h-4 w-4" />
                  <span>Registrarse</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4 mt-6">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold">Bienvenido de vuelta</h3>
                  <p className="text-sm text-muted-foreground">
                    Ingresa tus credenciales para acceder al dashboard
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
                    {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register" className="space-y-4 mt-6">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold">Crear cuenta de administrador</h3>
                  <p className="text-sm text-muted-foreground">
                    Registra una nueva cuenta para acceder al panel
                  </p>
                </div>
                
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Correo electrónico</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="tu-email@empresa.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Contraseña</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Mínimo 6 caracteres"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Repite tu contraseña"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading || !email || !password || !confirmPassword}
                  >
                    {isLoading ? "Registrando..." : "Crear Cuenta"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
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