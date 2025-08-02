import { AlertTriangle } from "lucide-react";

const ProblemSection = () => {
  return (
    <section className="section-padding bg-accent/5">
      <div className="container-max">
        <div className="max-w-4xl mx-auto text-center space-y-8 fade-in-up">
          {/* Quote */}
          <div className="relative">
            <div className="text-6xl text-accent/20 absolute -top-4 -left-4">"</div>
            <blockquote className="text-2xl md:text-3xl font-semibold text-accent italic leading-relaxed">
              Cada vez que vendo mis granos, tengo que cargar con miles de soles. 
              Es un riesgo… pero no tengo otra opción.
            </blockquote>
            <div className="text-6xl text-accent/20 absolute -bottom-8 -right-4">"</div>
          </div>

          <div className="space-y-6 pt-8">
            <div className="flex items-center justify-center mb-6">
              <AlertTriangle className="h-12 w-12 text-accent" />
            </div>

            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                Muchos agricultores como tú no confían en los bancos o simplemente no tienen acceso.
              </p>
              <p>
                Cada viaje al pueblo con efectivo es un peligro innecesario.
              </p>
              <p className="text-xl font-semibold text-foreground">
                Tú te esfuerzas por cosechar… ¿por qué deberías también preocuparte por ser asaltado?
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;