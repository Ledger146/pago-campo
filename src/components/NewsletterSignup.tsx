import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [acceptsNewsletter, setAcceptsNewsletter] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setIsSubmitting(true);

    try {
      // Insertar en la tabla usuarios de Supabase
      const { error: userError } = await supabase
        .from('usuarios')
        .insert([
          {
            nombre: name,
            email: email,
            telefono: null, // No se solicita teléfono en newsletter
          }
        ]);

      if (userError) {
        throw userError;
      }

      // Registrar descarga en la tabla descargas
      const { error: downloadError } = await supabase
        .from('descargas')
        .insert([
          {
            email: email,
            guia: 'Guia-Completa-PagoCampo'
          }
        ]);

      if (downloadError) {
        console.warn('Error al registrar descarga:', downloadError);
      }

      // Registrar evento
      await supabase
        .from('eventos')
        .insert([
          {
            tipo: 'descarga_guia',
            metadata: {
              source: 'newsletter_signup',
              nombre: name,
              email: email,
              acepta_newsletter: acceptsNewsletter,
              guia: 'Guia-Completa-PagoCampo'
            }
          }
        ]);
      
      // Trigger PDF download
      const pdfUrl = "/guia-pagocampo.pdf"; // Will need to add this PDF
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'Guia-Completa-PagoCampo.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "¡Registro exitoso! 📧",
        description: "Tu guía gratuita se está descargando. Revisa tu email para más información.",
      });

      setEmail("");
      setName("");
      setAcceptsNewsletter(false);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      toast({
        title: "Error",
        description: "Hubo un problema. Inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-padding bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="container-max">
        <div className="max-w-4xl mx-auto">
          <Card className="border-primary/20 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center space-y-4 mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Download className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  📖 Descarga GRATIS tu Guía Completa
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  "Cómo Revolucionar tus Pagos Rurales: De Riesgo a Seguridad Total"
                </p>
                <div className="bg-primary/10 rounded-lg p-4 max-w-2xl mx-auto">
                  <p className="text-primary font-semibold">
                    ✅ Estrategias para eliminar el riesgo de transportar efectivo<br/>
                    ✅ Casos de éxito de productores que ya usan PagoCampo<br/>
                    ✅ Guía paso a paso para implementar pagos seguros
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Tu nombre completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="newsletter"
                    checked={acceptsNewsletter}
                    onCheckedChange={(checked) => setAcceptsNewsletter(checked as boolean)}
                  />
                  <Label htmlFor="newsletter" className="text-sm">
                    Quiero recibir actualizaciones y consejos sobre pagos rurales seguros
                  </Label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 text-lg"
                  disabled={isSubmitting || !email || !name}
                >
                  <Download className="mr-2 h-5 w-5" />
                  {isSubmitting ? "Enviando..." : "Descargar Guía GRATIS"}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Tu información está segura. No compartimos datos con terceros.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;