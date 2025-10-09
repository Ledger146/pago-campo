import { MessageSquare, Shield, FileCheck } from "lucide-react";

const Differentiators = () => {
  const differentiators = [
    {
      icon: MessageSquare,
      title: "El agricultor manda un SMS",
      description: "Con el monto y código único.",
    },
    {
      icon: Shield,
      title: "El sistema confirma y genera recibo",
      description: "El recibo digital se guarda en blockchain automáticamente.",
    },
    {
      icon: FileCheck,
      title: "Confirmación en segundos",
      description: "Ambas partes reciben un mensaje claro con la confirmación.",
    },
  ];

  return (
    <section id="como-funciona" className="section-padding bg-primary/5">
      <div className="container-max">
        <div className="text-center space-y-4 mb-16 fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            ¿Cómo Funciona?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Un proceso simple explicado en lenguaje claro
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {differentiators.map((item, index) => (
            <div 
              key={index} 
              className="text-center space-y-4 fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <item.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentiators;