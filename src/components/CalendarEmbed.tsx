import { Calendar, Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CalendarEmbed = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-primary/5 to-secondary/10">
      <div className="container-max">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              📅 Agenda tu Capacitación Personalizada
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              30 minutos que transformarán tu negocio. Resuelve todas tus dudas con nuestro especialista.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left side - Benefits */}
            <div className="space-y-6">
              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Capacitación Personalizada</h3>
                      <p className="text-muted-foreground">
                        Sesión individual adaptada a tu tipo de negocio y necesidades específicas.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">30 Minutos de Valor</h3>
                      <p className="text-muted-foreground">
                        Sesión enfocada donde resolveremos todas tus dudas y diseñaremos tu estrategia.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">100% Gratuito</h3>
                      <p className="text-muted-foreground">
                        Sin compromisos. Solo información valiosa para mejorar tus pagos rurales.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-primary/10 rounded-lg p-4">
                <p className="text-primary font-semibold text-center">
                  ✅ Agenda disponible 24/7<br/>
                  ✅ Confirma tu cita al instante<br/>
                  ✅ Recordatorios automáticos por email
                </p>
              </div>
            </div>

            {/* Right side - Calendar Embed */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-primary/10">
              <div className="h-[600px] w-full">
                <iframe
                  src="https://cal.com/jc-byykuf/reunion-de-capacitacion-y-dudas"
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  title="Agendar Capacitación PagoCampo"
                  allow="camera; microphone; fullscreen; display-capture"
                />
              </div>
            </div>
          </div>

          {/* Call to action for mobile users */}
          <div className="mt-8 text-center lg:hidden">
            <Button 
              asChild
              size="lg"
              className="w-full max-w-sm"
            >
              <a 
                href="https://cal.com/jc-byykuf/reunion-de-capacitacion-y-dudas" 
                target="_blank"
                rel="noopener noreferrer"
              >
                Agendar en Ventana Nueva
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendarEmbed;