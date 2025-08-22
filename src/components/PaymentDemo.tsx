import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, CheckCircle, ArrowRight, Zap } from "lucide-react";

const PaymentDemo = () => {
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState("500");
  const [recipient, setRecipient] = useState("María García - Fertilizantes");
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    {
      title: "1. Ingresar datos del pago",
      description: "Sin necesidad de internet",
      component: "input"
    },
    {
      title: "2. Enviar SMS seguro",
      description: "Desde cualquier celular básico",
      component: "sms"
    },
    {
      title: "3. ¡Pago completado!",
      description: "Confirmación instantánea",
      component: "success"
    }
  ];

  const handleNextStep = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (step < steps.length - 1) {
        setStep(step + 1);
      } else {
        setStep(0); // Reset demo
      }
    }, 1500);
  };

  const resetDemo = () => {
    setStep(0);
    setAmount("500");
    setRecipient("María García - Fertilizantes");
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-max">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
            <Zap className="mr-2 h-4 w-4" />
            DEMO INTERACTIVA
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            🚀 Prueba PagoCampo ahora mismo
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubre lo fácil que es hacer pagos seguros sin internet
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Progress Steps */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold mb-6">Cómo funciona:</h3>
              {steps.map((stepItem, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 ${
                    index === step
                      ? "bg-primary/10 border-2 border-primary/30"
                      : index < step
                      ? "bg-green-50 border-2 border-green-200"
                      : "bg-muted/50 border-2 border-muted"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      index === step
                        ? "bg-primary text-primary-foreground"
                        : index < step
                        ? "bg-green-500 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index < step ? <CheckCircle className="h-5 w-5" /> : index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold">{stepItem.title}</h4>
                    <p className="text-sm text-muted-foreground">{stepItem.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Demo Interface */}
            <Card className="border-2 border-primary/20 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Simulador PagoCampo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {step === 0 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Destinatario</label>
                      <Input
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder="Nombre del destinatario"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Monto (S/)</label>
                      <Input
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        type="number"
                      />
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-800">
                        ℹ️ Sin internet requerido. Solo necesitas tu celular básico.
                      </p>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <p className="text-sm text-green-800 font-mono">
                        📱 SMS enviado a: 9999<br/>
                        PAGO {amount} SOLES A {recipient.split(" - ")[0]}<br/>
                        Código: #PC2024
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      <span className="ml-2 text-sm text-muted-foreground">Procesando...</span>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800">¡Pago Exitoso!</h4>
                      <p className="text-sm text-green-700 mt-1">
                        S/ {amount} enviado a {recipient.split(" - ")[0]}
                      </p>
                      <p className="text-xs text-green-600 mt-2">
                        ID: PC-{Date.now().toString().slice(-6)}
                      </p>
                    </div>
                  </div>
                )}

                <Button
                  onClick={step === steps.length - 1 ? resetDemo : handleNextStep}
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    "Procesando..."
                  ) : step === steps.length - 1 ? (
                    "Probar de nuevo"
                  ) : (
                    <>
                      Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                {step === 0 && (
                  <p className="text-xs text-center text-muted-foreground">
                    Esta es una simulación. Los pagos reales requieren registro.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentDemo;