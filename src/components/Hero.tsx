import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone } from "lucide-react";
import heroImage from "@/assets/hero-farmer.jpg";
import heroBackground from "@/assets/hero-background.jpg";

interface HeroProps { onCtaClick: () => void; }

const Hero = ({ onCtaClick }: HeroProps) => {
  const openMvp = () => { window.location.assign("/mvp"); };

  return (
    <section className="relative overflow-hidden text-primary-foreground" style={{ backgroundImage: `linear-gradient(90deg, rgba(3,25,24,0.88) 0%, rgba(3,25,24,0.72) 48%, rgba(3,25,24,0.42) 100%), url(${heroBackground})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
      <div className="container-max relative z-10 section-padding">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div className="max-w-3xl space-y-7 fade-in-up">
            <div className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">Pagos digitales para zonas rurales</div>
            <div className="space-y-5">
              <h1 className="font-heading text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl">Pagos digitales pensados para zonas rurales.</h1>
              <p className="max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">PagoCampo busca reducir la dependencia del efectivo mediante un flujo sencillo, trazable y preparado para contextos de baja conectividad.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button onClick={openMvp} size="lg" className="h-auto bg-primary px-7 py-5 text-base font-bold text-primary-foreground shadow-xl hover:bg-primary/90"><Smartphone className="mr-2 h-5 w-5" />Probar MVP<ArrowRight className="ml-2 h-4 w-4" /></Button>
              <Button onClick={onCtaClick} variant="outline" size="lg" className="h-auto border-white/40 bg-white/10 px-7 py-5 text-base text-white hover:bg-white/20 hover:text-white">Conocer la propuesta</Button>
            </div>
            <div className="grid max-w-xl gap-3 border-t border-white/15 pt-5 text-sm font-medium text-white/90 sm:grid-cols-3"><span>✓ Baja conectividad</span><span>✓ TX-ID por operación</span><span>✓ Historial y estados</span></div>
          </div>

          <div className="relative fade-in">
            <div className="overflow-hidden rounded-3xl border border-white/20 bg-black/10 shadow-2xl"><img src={heroImage} alt="Agricultor usando un celular en el campo" className="aspect-video h-full w-full object-cover" /></div>
            <div className="absolute -bottom-5 -left-4 max-w-xs rounded-2xl border border-border bg-background/95 p-4 shadow-xl backdrop-blur-sm sm:-left-6"><div className="flex items-center gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10"><Smartphone className="h-5 w-5 text-primary" /></div><div><p className="text-sm font-semibold text-foreground">Operación demostrativa</p><p className="text-xs text-muted-foreground">Saldo, TX-ID y estado en un solo flujo</p></div></div></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
