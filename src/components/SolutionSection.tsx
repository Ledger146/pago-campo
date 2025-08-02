import { MessageSquare, Key, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const SolutionSection = () => {
  const steps = [
    {
      icon: MessageSquare,
      title: "Una app sencilla que funciona solo con SMS",
      description: "No necesitas internet ni aplicaciones complicadas",
    },
    {
      icon: Key,
      title: "Genera un código. Lo compartes. ¡Y listo!",
      description: "El proceso es tan simple como enviar un mensaje",
    },
    {
      icon: CheckCircle,
      title: "El pago llega seguro a quien debe llegar",
      description: "Confirmación inmediata y seguridad garantizada",
    },
  ];

  return (
    <section id="como-funciona" className="section-padding bg-background">
      <div className="container-max">
        <div className="text-center space-y-4 mb-16 fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Presentamos PagoCampo
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Funciona con cualquier operador y no necesitas estar conectado a internet.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <Card className="border-primary/20 hover:border-primary/40 transition-colors duration-300 h-full">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <step.icon className="h-10 w-10 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
              
              {/* Arrow connector */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-0.5 bg-primary/30"></div>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1">
                    <div className="w-0 h-0 border-l-4 border-l-primary/30 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;