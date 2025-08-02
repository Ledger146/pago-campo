import { Tractor, Lock, Users } from "lucide-react";

const Differentiators = () => {
  const differentiators = [
    {
      icon: Tractor,
      title: "🚜 Hecho para el campo",
      description: "No necesitas señal 4G ni WiFi. Solo SMS.",
    },
    {
      icon: Lock,
      title: "🔐 Seguro y confiable",
      description: "Código único para cada transacción, validado por ambos lados.",
    },
    {
      icon: Users,
      title: "🤝 Apoya a tu comunidad",
      description: "Reduce los riesgos para todos en la cadena agrícola.",
    },
  ];

  return (
    <section className="section-padding bg-primary/5">
      <div className="container-max">
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