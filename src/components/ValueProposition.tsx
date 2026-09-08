import { Shield, WifiOff, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ValueProposition = () => {
  const benefits = [
    {
      icon: WifiOff,
      title: "Pensado para baja conectividad",
      description: "La propuesta prioriza canales simples para contextos donde el internet móvil no es confiable.",
    },
    {
      icon: Shield,
      title: "Menos dependencia del efectivo",
      description: "El objetivo es reducir la necesidad de transportar grandes sumas de dinero durante las actividades del campo.",
    },
    {
      icon: Zap,
      title: "Operaciones trazables",
      description: "Cada operación del MVP tiene un identificador único, estado e historial para facilitar el seguimiento.",
    },
  ];

  return (
    <section id="beneficios" className="section-padding bg-background">
      <div className="container-max">
        <div className="mx-auto mb-12 max-w-3xl text-center fade-in-up">
          <span className="mb-3 inline-flex rounded-full border bg-muted/40 px-3 py-1 text-sm font-medium text-muted-foreground">Propuesta de valor</span>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Una solución simple para un problema real</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">Menos fricción para el usuario rural y más control sobre cada operación.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <Card key={index} className="h-full border-border/60 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-7 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <benefit.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{benefit.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
