import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone } from "lucide-react";
import heroImage from "@/assets/hero-farmer.jpg";
import heroBackground from "@/assets/hero-background.jpg";

interface HeroProps {
  onCtaClick: () => void;
}

const Hero = ({ onCtaClick }: HeroProps) => {
  const openMvp = () => { window.location.href = "/mvp"; };

  return (
    <section
      className="relative overflow-hidden text-primary-foreground"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.64), rgba(0, 0, 0, 0.48)), url(${heroBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container-max section-padding relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-7 fade-in-up">
            <div className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              Pagos digitales pensados para zonas rurales
            </div>
            <div className="space-y-5">
              <h1 className="font-heading text-4xl font-bold leading-tight text-white drop-shadow-lg md:text-5xl lg:text-6xl">
                Paga y cobra en el campo cuando la conectividad no acompaña.
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-white/90 drop-shadow-md md:text-xl">
                PagoCampo busca reducir la dependencia del efectivo mediante un flujo sencillo, trazable y preparado para operar en contextos de baja conectividad.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button onClick={openMvp} size="lg" className="h-auto bg-accent px-7 py-5 text-base font-semibold text-accent-foreground shadow-xl hover:bg-accent/90">
                <Smartphone className="mr-2 h-5 w-5" />
                Probar MVP
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button onClick={onCtaClick} variant="outline" size="lg" className="h-auto border-white/40 bg-white/10 px-7 py-5 text-base text-white hover:bg-white/20 hover:text-white">
                Conocer la propuesta
              </Button>
            </div>
            <div className="grid gap-3 pt-1 text-sm font-medium text-white/90 sm:grid-cols-3">
              <span>✓ Baja conectividad</span>
              <span>✓ TX-ID por operación</span>
              <span>✓ Historial y estados</span>
            </div>
          </div>

          <div className="relative fade-in">
            <div className="overflow-hidden rounded-2xl border border-white/20 shadow-2xl">
              <img src={heroImage} alt="Agricultor usando un celular en el campo" className="aspect-video h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-5 -left-4 max-w-xs rounded-xl border border-border bg-background/95 p-4 shadow-xl backdrop-blur-sm sm:-left-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Smartphone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Operación demostrativa</p>
                  <p className="text-xs text-muted-foreground">Saldo, TX-ID y estado en un solo flujo</p>
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
