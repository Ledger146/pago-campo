import { Gift, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface OfferSectionProps {
  onCtaClick: () => void;
}

const OfferSection = ({ onCtaClick }: OfferSectionProps) => {
  const benefits = [
    {
      icon: Gift,
      text: "5 pagos sin costo de comisión",
    },
    {
      icon: Clock,
      text: "Aprende a usar la app en menos de 15 minutos",
    },
    {
      icon: Users,
      text: "Soporte personalizado para agricultores",
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-secondary/10 to-primary/10">
      <div className="container-max">
        <Card className="border-secondary/30 bg-background/80 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12 text-center space-y-8">
            <div className="space-y-4 fade-in-up">
              <div className="text-4xl mb-4">🎁</div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Oferta especial de lanzamiento
              </h2>
              <p className="text-xl text-muted-foreground">
                Regístrate gratis y recibe beneficios exclusivos
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 fade-in-up">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3 justify-center md:justify-start">
                  <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-5 w-5 text-secondary" />
                  </div>
                  <span className="font-medium text-foreground">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-4 fade-in-up">
            <Button
              onClick={onCtaClick}
              variant="cta"
              size="lg"
              className="font-bold text-xl px-12 py-6 h-auto"
            >
                🌾 Empieza con PagoCampo hoy
              </Button>
              <p className="text-sm text-muted-foreground">
                Sin internet. Sin bancos. Sin riesgos.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default OfferSection;