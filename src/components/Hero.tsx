import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";
import heroImage from "@/assets/hero-farmer.jpg";
import heroBackground from "@/assets/hero-background.jpg";

interface HeroProps {
  onCtaClick: () => void;
}

const Hero = ({ onCtaClick }: HeroProps) => {
  return (
    <section 
      className="relative text-primary-foreground overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container-max section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 fade-in-up">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight font-heading text-white drop-shadow-lg">
                💸 Cobra y paga sin llevar dinero en efectivo
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-white/95 leading-relaxed drop-shadow-md">
                Seguridad para ti, tu café y tu cacao — sin necesidad de internet.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={onCtaClick}
                variant="cta"
                size="lg"
                className="text-lg px-8 py-6 h-auto shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Smartphone className="mr-2 h-6 w-6" />
                📲 Quiero usar PagoCampo
              </Button>
            </div>
            
            <div className="flex items-center space-x-6 text-base text-white/90 font-medium">
              <span className="flex items-center gap-2">✓ Sin internet</span>
              <span className="flex items-center gap-2">✓ Solo SMS</span>
              <span className="flex items-center gap-2">✓ 100% seguro</span>
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