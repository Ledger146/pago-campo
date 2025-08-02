import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";
import heroImage from "@/assets/hero-farmer.jpg";

interface HeroProps {
  onCtaClick: () => void;
}

const Hero = ({ onCtaClick }: HeroProps) => {
  return (
    <section className="hero-gradient text-primary-foreground">
      <div className="container-max section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 fade-in-up">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                💸 Cobra y paga sin llevar dinero en efectivo
              </h1>
              <p className="text-xl md:text-2xl text-primary-foreground/90 leading-relaxed">
                Seguridad para ti, tu café y tu cacao — sin necesidad de internet.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={onCtaClick}
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold text-lg px-8 py-6 h-auto"
              >
                <Smartphone className="mr-2 h-5 w-5" />
                📲 Quiero usar PagoCampo
              </Button>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-primary-foreground/80">
              <span>✓ Sin internet</span>
              <span>✓ Solo SMS</span>
              <span>✓ 100% seguro</span>
            </div>
          </div>

          {/* Image */}
          <div className="relative fade-in">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Agricultor feliz usando un celular sencillo en medio del campo"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-background/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-border max-w-xs">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    ¡Pago exitoso!
                  </p>
                  <p className="text-muted-foreground text-xs">
                    S/ 1,250.00 transferido
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;