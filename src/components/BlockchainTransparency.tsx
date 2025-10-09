import { Shield, FileCheck, Lock, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const BlockchainTransparency = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Cada pago genera un recibo digital protegido",
      description: "Automáticamente guardado en blockchain sin que lo notes",
    },
    {
      icon: Lock,
      title: "Ese recibo no puede borrarse ni cambiarse",
      description: "Permanece seguro para siempre como prueba de tu transacción",
    },
    {
      icon: FileCheck,
      title: "Puedes mostrarlo como comprobante oficial",
      description: "Válido y verificable cuando lo necesites",
    },
    {
      icon: CheckCircle,
      title: "Solo recibes un SMS claro",
      description: "Sin palabras raras ni números largos. Todo simple y entendible.",
    },
  ];

  return (
    <section id="transparencia" className="section-padding bg-accent/5">
      <div className="container-max">
        <div className="text-center space-y-4 mb-16 fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            ¿Qué significa blockchain para ti?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explicado en lenguaje simple para agricultores
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="border-border/50 hover:border-primary/30 transition-colors duration-300 fade-in-up bg-card/80 backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 max-w-3xl mx-auto text-center fade-in-up">
          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8">
            <p className="text-lg text-foreground leading-relaxed">
              <strong>Lo importante:</strong> Tú no ves palabras raras ni números largos. 
              Solo recibes un mensaje claro confirmando tu pago. La tecnología blockchain 
              trabaja en segundo plano para mantener todo seguro.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlockchainTransparency;
