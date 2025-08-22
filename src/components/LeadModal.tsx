import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Leaf } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeadModal = ({ isOpen, onClose }: LeadModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validaciones del frontend
    if (!formData.name.trim()) {
      toast({
        title: "Nombre requerido",
        description: "Por favor, ingresa tu nombre completo.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    if (!formData.email.trim()) {
      toast({
        title: "Email requerido", 
        description: "Por favor, ingresa un correo electrónico válido.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    if (!formData.phone.trim()) {
      toast({
        title: "Teléfono requerido",
        description: "Por favor, ingresa tu número de celular.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, ingresa un correo electrónico válido (ejemplo: tu@email.com).",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Validar formato de teléfono (números, espacios, + permitidos)
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{9,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast({
        title: "Teléfono inválido",
        description: "Por favor, ingresa un número de teléfono válido (ejemplo: +51 999 999 999).",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('Intentando registrar usuario:', formData);
      
      // Insertar en la tabla usuarios de Supabase
      const { error, data } = await supabase
        .from('usuarios')
        .insert([
          {
            nombre: formData.name.trim(),
            email: formData.email.toLowerCase().trim(),
            telefono: formData.phone.trim(),
          }
        ])
        .select();

      if (error) {
        console.error('Error detallado de Supabase:', error);
        
        // Manejar errores específicos
        if (error.code === '23505') {
          toast({
            title: "Usuario ya registrado",
            description: "Este email ya está registrado. ¿Ya tienes una cuenta?",
            variant: "destructive"
          });
        } else if (error.message.includes('violates check constraint')) {
          toast({
            title: "Datos inválidos",
            description: "Verifica que todos los campos estén completos y en el formato correcto.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Error de conexión",
            description: `No se pudo conectar a la base de datos. Error: ${error.message}`,
            variant: "destructive"
          });
        }
        setIsSubmitting(false);
        return;
      }

      console.log('Usuario registrado exitosamente:', data);

      // Registrar evento en la tabla eventos
      await supabase
        .from('eventos')
        .insert([
          {
            tipo: 'registro_nuevo_usuario',
            metadata: {
              source: 'lead_modal',
              nombre: formData.name,
              email: formData.email,
              telefono: formData.phone
            }
          }
        ]);

      toast({
        title: "¡Registro exitoso! 🌾",
        description: "Te contactaremos pronto para ayudarte a comenzar con PagoCampo.",
      });

      setFormData({ name: "", email: "", phone: "" });
      onClose();
    } catch (error) {
      console.error('Error inesperado al registrar usuario:', error);
      toast({
        title: "Error inesperado",
        description: "Ocurrió un problema inesperado. Por favor, verifica tu conexión a internet e inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Leaf className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold">
            ¡Únete a PagoCampo!
          </DialogTitle>
          <DialogDescription className="text-base">
            Completa tus datos y te contactaremos para ayudarte a comenzar con pagos seguros sin internet.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Tu nombre completo"
              value={formData.name}
              onChange={handleChange}
              required
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Número de celular</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+51 999 999 999"
              value={formData.phone}
              onChange={handleChange}
              required
              className="h-12"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Comenzar ahora"}
            </Button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-xs text-muted-foreground">
            Al registrarte, aceptas nuestros términos y condiciones
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadModal;