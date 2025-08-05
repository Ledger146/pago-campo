import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ComparisonTable = () => {
  const features = [
    {
      feature: "Funciona sin internet (vía SMS)",
      pagocampo: true,
      yape: false,
      competitor: false,
    },
    {
      feature: "Hecha especialmente para agricultores",
      pagocampo: true,
      yape: false,
      competitor: false,
    },
    {
      feature: "No requiere cuenta bancaria",
      pagocampo: true,
      yape: false,
      competitor: false,
    },
    {
      feature: "Seguridad en zonas rurales",
      pagocampo: true,
      yape: false,
      competitor: false,
    },
    {
      feature: "Compatible con celulares básicos",
      pagocampo: true,
      yape: false,
      competitor: false,
    },
    {
      feature: "Pagos directos a proveedores",
      pagocampo: true,
      yape: true,
      competitor: true,
    },
    {
      feature: "Tarifas bajas para el campo",
      pagocampo: true,
      yape: false,
      competitor: false,
    },
    {
      feature: "Soporte en zonas sin señal",
      pagocampo: true,
      yape: false,
      competitor: false,
    },
  ];

  const CheckIcon = ({ value }: { value: boolean }) => (
    value ? (
      <Check className="w-6 h-6 text-primary mx-auto" />
    ) : (
      <X className="w-6 h-6 text-muted-foreground mx-auto" />
    )
  );

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-max">
        <div className="text-center mb-12 fade-in-up">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            ¿Por qué PagoCampo es mejor para ti?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comparamos PagoCampo con otras opciones populares en Perú para que veas las diferencias
          </p>
        </div>

        <Card className="max-w-4xl mx-auto fade-in-up">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-heading">
              Comparación de Servicios de Pago
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-heading text-lg">Características</th>
                    <th className="text-center p-4 bg-secondary/20 font-heading text-lg">
                      🌾 PagoCampo
                    </th>
                    <th className="text-center p-4 font-heading text-lg">Yape</th>
                    <th className="text-center p-4 font-heading text-lg">Tunki</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-muted/20 transition-colors">
                      <td className="p-4 font-medium text-foreground">
                        {item.feature}
                      </td>
                      <td className="p-4 bg-secondary/10 text-center">
                        <CheckIcon value={item.pagocampo} />
                      </td>
                      <td className="p-4 text-center">
                        <CheckIcon value={item.yape} />
                      </td>
                      <td className="p-4 text-center">
                        <CheckIcon value={item.competitor} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 max-w-3xl mx-auto fade-in-up">
          <Card className="bg-primary/10 border-primary/30">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-xl font-heading font-bold text-primary mb-3">
                  🌱 PagoCampo: La única solución pensada para el campo
                </h3>
                <p className="text-foreground text-lg leading-relaxed">
                  Mientras otras apps necesitan internet y bancos, PagoCampo funciona donde tú trabajas: 
                  en el campo, sin señal, con tu celular de siempre. <strong>Cobra y paga seguro, 
                  sin arriesgar tu vida</strong> llevando efectivo por las carreteras.
                </p>
                <div className="mt-4 p-4 bg-background/50 rounded-lg">
                  <p className="text-primary font-semibold">
                    ✅ 8 de 8 ventajas que necesitas vs. 1 de 8 de otras apps
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;