import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, MapPin, CreditCard, TrendingUp } from "lucide-react";

const TrustCounter = () => {
  const [counters, setCounters] = useState({
    users: 0,
    transactions: 0,
    regions: 0,
    savings: 0
  });

  const finalCounts = {
    users: 347,
    transactions: 2840,
    regions: 12,
    savings: 89000
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const increment = 50; // Update every 50ms
    const steps = duration / increment;

    Object.keys(finalCounts).forEach((key) => {
      const stepValue = finalCounts[key as keyof typeof finalCounts] / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += stepValue;
        if (current >= finalCounts[key as keyof typeof finalCounts]) {
          current = finalCounts[key as keyof typeof finalCounts];
          clearInterval(timer);
        }
        setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, increment);
    });
  }, []);

  const stats = [
    {
      icon: Users,
      count: counters.users,
      suffix: "+",
      label: "Productores registrados",
      color: "text-blue-600"
    },
    {
      icon: CreditCard,
      count: counters.transactions,
      suffix: "+",
      label: "Transacciones seguras",
      color: "text-green-600"
    },
    {
      icon: MapPin,
      count: counters.regions,
      suffix: "",
      label: "Regiones del Perú",
      color: "text-purple-600"
    },
    {
      icon: TrendingUp,
      count: counters.savings,
      suffix: "+",
      prefix: "S/ ",
      label: "Ahorrados en seguridad",
      color: "text-orange-600"
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-r from-primary/5 to-primary/10">
      <div className="container-max">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            🏆 Confianza que Crece Cada Día
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Únete a cientos de productores que ya transformaron sus pagos
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="border-primary/20 hover:border-primary/40 transition-colors duration-300 hover:shadow-lg"
            >
              <CardContent className="p-6 text-center space-y-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto bg-background ${stat.color} bg-opacity-10`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground">
                    {stat.prefix || ""}{stat.count.toLocaleString()}{stat.suffix}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 leading-tight">
                    {stat.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-primary/10 rounded-xl p-6 max-w-2xl mx-auto">
            <p className="text-lg font-semibold text-primary mb-2">
              💡 "Desde que uso PagoCampo, duermo tranquilo"
            </p>
            <p className="text-muted-foreground">
              - Carlos Mendoza, Productor de papas, Huancayo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustCounter;