import { ArrowRight, CheckCircle2, Radio, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const MvpShowcase = () => {
  const features = [
    { icon: Radio, title: "Funciona sin señal", text: "Simula una operación que queda pendiente cuando se pierde la conexión." },
    { icon: ShieldCheck, title: "Evita duplicados", text: "Cada operación tiene un TX-ID para demostrar el control de reintentos." },
    { icon: CheckCircle2, title: "Seguimiento", text: "Visualiza saldo, historial, estados y métricas en un solo lugar." },
  ];

  return (
    <section className="py-16 md:py-20 bg-muted/30 border-y border-border">
      <div className="container-max">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm font-medium mb-4">
            MVP interactivo
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Prueba cómo funcionaría PagoCampo</h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">
            No necesitas imaginar el flujo: puedes probar una simulación de pagos, retiros y recepción de dinero con y sin señal.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-xl border bg-card p-5 shadow-sm">
              <Icon className="h-6 w-6 mb-4" />
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button size="lg" onClick={() => { window.location.href = "/mvp"; }}>
            Probar MVP ahora
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-4">MVP demostrativo · no mueve dinero real</p>
      </div>
    </section>
  );
};

export default MvpShowcase;
