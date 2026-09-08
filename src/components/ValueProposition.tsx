import { Shield, WifiOff, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ValueProposition = () => {
  const benefits = [
    { icon: WifiOff, number: "01", title: "Baja conectividad", description: "Una propuesta pensada para contextos donde el internet móvil no siempre está disponible." },
    { icon: Shield, number: "02", title: "Menos efectivo", description: "Busca reducir la necesidad de transportar grandes sumas de dinero durante las actividades del campo." },
    { icon: Zap, number: "03", title: "Trazabilidad", description: "Cada operación del MVP cuenta con TX-ID, estado e historial para facilitar su seguimiento." },
  ];

  return (
    <section id="beneficios" className="section-padding bg-muted/25">
      <div className="container-max">
        <div className="mb-12 max-w-3xl fade-in-up">
          <div className="mb-4 flex items-center gap-3"><span className="h-px w-10 bg-primary" /><span className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Beneficios</span></div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">Una solución simple para un problema real</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">Menos fricción para el usuario rural y más control sobre cada operación.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {benefits.map(({ icon: Icon, number, title, description }, index) => (
            <Card key={title} className="group h-full overflow-hidden border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-7 md:p-8">
                <div className="mb-8 flex items-center justify-between"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10"><Icon className="h-6 w-6 text-primary" /></div><span className="text-sm font-bold tracking-widest text-muted-foreground/50">{number}</span></div>
                <h3 className="text-2xl font-bold text-foreground">{title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{description}</p>
                <div className="mt-7 h-1 w-12 rounded-full bg-primary transition-all duration-300 group-hover:w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
