import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Smartphone, CheckCircle, ArrowRight, Zap, MessageSquare, WifiOff } from "lucide-react";

const PaymentDemo = () => {
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState("500");
  const [recipient, setRecipient] = useState("María García");
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    { title: "Preparas el pago", description: "Indicas destinatario y monto.", icon: Smartphone },
    { title: "Se envía la operación", description: "El flujo está pensado para baja conectividad.", icon: MessageSquare },
    { title: "Recibes confirmación", description: "La operación queda identificada y trazable.", icon: CheckCircle },
  ];

  const next = () => {
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); setStep((current) => current < 2 ? current + 1 : 0); }, 700);
  };
  const reset = () => { setStep(0); setAmount("500"); setRecipient("María García"); };

  return (
    <section className="section-padding bg-muted/20">
      <div className="container-max">
        <div className="mb-12 max-w-3xl fade-in-up">
          <div className="mb-4 flex items-center gap-3"><span className="h-px w-10 bg-primary" /><span className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Experiencia interactiva</span></div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Mira el flujo antes de probar el MVP</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">Una demostración visual, paso a paso, para entender la propuesta sin entrar todavía en detalles técnicos.</p>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <div className="rounded-3xl border bg-card p-6 shadow-sm md:p-8">
            <div className="mb-7 flex items-center justify-between"><span className="text-sm font-semibold text-muted-foreground">Paso {step + 1} de 3</span><Badge variant="secondary">Demo</Badge></div>
            <div className="space-y-3">
              {steps.map(({ title, description, icon: Icon }, index) => (
                <button key={title} type="button" onClick={() => setStep(index)} className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all ${index === step ? "border-primary bg-primary/10 shadow-sm" : "border-border bg-background hover:bg-muted/50"}`}>
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${index === step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{index < step ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}</div>
                  <div><p className="font-semibold">{title}</p><p className="mt-1 text-sm text-muted-foreground">{description}</p></div>
                </button>
              ))}
            </div>
            <div className="mt-7 flex items-start gap-3 rounded-2xl bg-muted/60 p-4"><WifiOff className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><p className="text-sm leading-relaxed text-muted-foreground"><strong className="text-foreground">Idea central:</strong> el diseño parte de la realidad de usuarios que no siempre cuentan con internet móvil estable.</p></div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border bg-foreground p-5 shadow-xl md:p-8">
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative mx-auto max-w-md">
              <div className="mb-5 flex items-center justify-between text-white"><div><p className="text-xs uppercase tracking-widest text-white/50">PagoCampo</p><p className="mt-1 font-semibold">Simulación del flujo</p></div><div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10"><Smartphone className="h-5 w-5" /></div></div>
              <div className="min-h-[310px] rounded-[2rem] border border-white/10 bg-background p-5 shadow-2xl">
                {step === 0 && <div className="space-y-5"><div><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Nuevo pago</p><h3 className="mt-1 text-2xl font-bold">¿A quién pagarás?</h3></div><div><label className="text-sm font-medium">Destinatario</label><Input value={recipient} onChange={(e) => setRecipient(e.target.value)} className="mt-2" /></div><div><label className="text-sm font-medium">Monto (S/)</label><Input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" className="mt-2 text-lg" /></div></div>}
                {step === 1 && <div className="flex min-h-[270px] flex-col items-center justify-center text-center"><div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"><MessageSquare className="h-9 w-9 text-primary" /></div><h3 className="text-2xl font-bold">Operación enviada</h3><p className="mt-2 max-w-xs text-sm text-muted-foreground">El sistema registra la solicitud y mantiene su trazabilidad incluso ante una interrupción de conectividad.</p><div className="mt-5 rounded-xl bg-muted px-4 py-3 font-mono text-xs">TX-PC-{amount || "000"}-DEMO</div></div>}
                {step === 2 && <div className="flex min-h-[270px] flex-col items-center justify-center text-center"><div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary/15"><CheckCircle className="h-10 w-10 text-primary" /></div><h3 className="text-2xl font-bold">Operación confirmada</h3><p className="mt-2 text-muted-foreground">S/ {amount || "0"} para {recipient || "beneficiario"}</p><div className="mt-5 rounded-xl border bg-muted/50 px-4 py-3 text-left text-xs"><span className="text-muted-foreground">Estado</span><div className="mt-1 font-semibold">Completada · TX-ID único</div></div></div>}
              </div>
              <Button onClick={step === 2 ? reset : next} disabled={isLoading} className="mt-5 w-full" size="lg">{isLoading ? "Procesando..." : step === 2 ? "Ver de nuevo" : "Continuar"}{!isLoading && step !== 2 && <ArrowRight className="ml-2 h-4 w-4" />}</Button>
              <p className="mt-4 text-center text-xs text-white/50"><Zap className="mr-1 inline h-3 w-3" />Simulación de portafolio · no mueve dinero real</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentDemo;
