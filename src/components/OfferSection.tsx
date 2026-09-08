import { ArrowRight, ShieldCheck, Users, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface OfferSectionProps {
  onCtaClick: () => void;
}

const OfferSection = ({ onCtaClick }: OfferSectionProps) => {
  const benefits = [
    { icon: Workflow, text: "Flujo de pagos y retiros demostrable" },
    { icon: ShieldCheck, text: "TX-ID, estados y control de reintentos" },
    { icon: Users, text: "Diseñado pensando en usuarios rurales" },
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-max">
        <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-background to-primary/5 shadow-xl">
          <CardContent className="p-8 text-center md:p-12">
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">Proyecto demostrativo</span>
            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold leading-tight text-foreground md:text-5xl">
              La mejor forma de entender PagoCampo es probarlo.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Explora el MVP y observa cómo responde una operación cuando existe señal, cuando se pierde la conexión y cuando se intenta repetir una transacción.
            </p>

            <div className="my-8 grid gap-4 md:grid-cols-3">
              {benefits.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 rounded-xl border bg-background/80 p-4 text-left">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button onClick={() => { window.location.href = "/mvp"; }} size="lg" className="h-auto px-8 py-5">
                Probar MVP
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button onClick={onCtaClick} variant="outline" size="lg" className="h-auto px-8 py-5">
                Ver información de contacto
              </Button>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">MVP de portafolio · datos simulados · no mueve dinero real</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default OfferSection;
