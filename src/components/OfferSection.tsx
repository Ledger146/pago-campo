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
    <section className="section-padding bg-gradient-to-br from-primary/20 via-secondary/15 to-primary/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-max relative">
        <Card className="border-2 border-primary/30 bg-gradient-to-br from-background via-background/95 to-primary/5 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-8 md:p-12 text-center space-y-8">
            <div className="space-y-4 fade-in-up">
              <div className="text-6xl mb-4 animate-bounce">🎁</div>
              <div className="inline-block bg-primary/20 text-primary font-bold px-6 py-2 rounded-full text-sm uppercase tracking-wide mb-4">
                Oferta Especial de Lanzamiento
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Únete a cientos de agricultores que ya cobran 
                <br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  sin efectivo y con confianza total
                </span>
              </h2>
              <p className="text-xl text-muted-foreground font-medium">
                Pagos seguros con blockchain, explicado simple
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 fade-in-up">
              {benefits.map((benefit, index) => (
                <div key={index} className="group p-4 rounded-xl bg-gradient-to-br from-secondary/10 to-primary/5 border border-secondary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:scale-105">
                  <div className="flex items-center space-x-3 justify-center md:justify-start">
                    <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow">
                      <benefit.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-semibold text-foreground text-lg">
                      {benefit.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6 fade-in-up">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-75"></div>
                <Button
                  onClick={onCtaClick}
                  variant="cta"
                  size="lg"
                  className="relative font-bold text-2xl px-16 py-8 h-auto rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                >
                  📲 Quiero usar PagoCampo
                </Button>
              </div>
              <div className="bg-background/80 rounded-lg p-4 border border-primary/20">
                <p className="text-base font-semibold text-foreground">
                  ✅ Sin internet • ✅ Sin bancos • ✅ Sin riesgos
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default OfferSection;