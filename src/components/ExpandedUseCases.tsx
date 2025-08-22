import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Users, ShoppingCart, Banknote, CheckCircle } from "lucide-react";

const ExpandedUseCases = () => {
  const useCases = [
    {
      icon: Truck,
      title: "Productor de Papas",
      location: "Huancayo, Junín",
      problem: "Transportaba S/ 15,000 en efectivo mensual para pagar a trabajadores y proveedores",
      solution: "Ahora paga todo por SMS desde su campo",
      savings: "S/ 2,400 anuales en seguridad y transporte",
      metrics: "150+ pagos seguros",
      testimonial: "Ya no tengo miedo de que me roben. Mi familia duerme tranquila.",
      author: "Carlos Mendoza",
      bgColor: "from-blue-50 to-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: Users,
      title: "Cooperativa Agrícola",
      location: "Cusco, Cusco",
      problem: "Coordinaba pagos de 80 socios, perdía días viajando al banco",
      solution: "Gestiona todos los pagos desde la oficina vía SMS",
      savings: "40 horas mensuales ahorradas",
      metrics: "80 productores conectados",
      testimonial: "Revolucionó nuestra cooperativa. Ahora somos más eficientes.",
      author: "María Luz Quispe",
      bgColor: "from-green-50 to-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: ShoppingCart,
      title: "Comerciante Rural",
      location: "Ayacucho, Ayacucho",
      problem: "Compraba productos con efectivo, arriesgaba grandes sumas",
      solution: "Paga a proveedores al instante con su celular básico",
      savings: "100% seguridad en transacciones",
      metrics: "S/ 50,000 en pagos seguros",
      testimonial: "Mis compras son más rápidas y seguras. Los proveedores confían más.",
      author: "Don Segundo Huamán",
      bgColor: "from-purple-50 to-purple-100",
      iconColor: "text-purple-600"
    },
    {
      icon: Banknote,
      title: "Acopiador Regional",
      location: "Puno, Puno",
      problem: "Pagaba a 200+ productores en efectivo, riesgo constante",
      solution: "Sistema de pagos masivos por SMS a múltiples productores",
      savings: "S/ 8,000 anuales en logística",
      metrics: "200+ pagos simultáneos",
      testimonial: "Transformó mi negocio. Puedo pagar a todos mis productores en minutos.",
      author: "Rosa Elena Mamani",
      bgColor: "from-orange-50 to-orange-100",
      iconColor: "text-orange-600"
    }
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-max">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
            CASOS REALES DE ÉXITO
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            🏅 Historias que Inspiran Confianza
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conoce cómo productores, cooperativas y comerciantes de todo el Perú 
            transformaron sus pagos con PagoCampo
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <Card 
              key={index}
              className="border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              <CardContent className="p-0">
                {/* Header */}
                <div className={`bg-gradient-to-r ${useCase.bgColor} p-6`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 bg-white rounded-lg flex items-center justify-center`}>
                        <useCase.icon className={`h-6 w-6 ${useCase.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{useCase.title}</h3>
                        <p className="text-sm text-gray-600">📍 {useCase.location}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-white">
                      Caso Real
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Problem */}
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">❌ ANTES (El Problema):</h4>
                    <p className="text-sm text-muted-foreground">{useCase.problem}</p>
                  </div>

                  {/* Solution */}
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">✅ DESPUÉS (La Solución):</h4>
                    <p className="text-sm text-muted-foreground">{useCase.solution}</p>
                  </div>

                  {/* Results */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-green-700">{useCase.savings}</div>
                      <div className="text-xs text-green-600">Ahorro anual</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-blue-700">{useCase.metrics}</div>
                      <div className="text-xs text-blue-600">Logro destacado</div>
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
                    <p className="text-sm italic text-muted-foreground mb-2">
                      "{useCase.testimonial}"
                    </p>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">{useCase.author}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-primary/20 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              🤝 ¿Te identificas con alguno de estos casos?
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              No importa el tamaño de tu operación, PagoCampo se adapta a tus necesidades
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Pequeños productores</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Cooperativas grandes</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Comerciantes regionales</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpandedUseCases;