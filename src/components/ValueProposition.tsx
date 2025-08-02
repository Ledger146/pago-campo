import { Shield, WifiOff, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ValueProposition = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Seguridad total",
      description: "Ya no arriesgues tu vida transportando grandes sumas de dinero.",
    },
    {
      icon: WifiOff,
      title: "Sin internet, sin problema",
      description: "Funciona solo con SMS desde cualquier celular.",
    },
    {
      icon: Zap,
      title: "Pagos fáciles y rápidos",
      description: "A proveedores, clientes y más, sin salir del campo.",
    },
  ];

  return (
    <section id="beneficios" className="section-padding bg-background">
      <div className="container-max">
        <div className="text-center space-y-4 mb-16 fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            ¿Por qué elegir PagoCampo?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="border-border/50 hover:border-primary/30 transition-colors duration-300 fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <benefit.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  ✅ {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;