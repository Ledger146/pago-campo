import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "¿Necesito internet para usar la app?",
      answer: "No. Solo necesitas señal para enviar y recibir mensajes de texto (SMS). PagoCampo funciona completamente sin conexión a internet.",
    },
    {
      question: "¿Qué tipo de celular necesito?",
      answer: "Funciona con cualquier celular que pueda enviar SMS, incluso los más sencillos. No necesitas un smartphone moderno.",
    },
    {
      question: "¿Es seguro?",
      answer: "Sí. Cada código tiene un tiempo de uso y confirmación. Nadie más puede usarlo. Además, ambas partes deben confirmar la transacción.",
    },
    {
      question: "¿A quién puedo pagar con PagoCampo?",
      answer: "A cualquier persona que tenga un número móvil y esté registrada en el sistema: proveedores, clientes o familiares.",
    },
    {
      question: "¿Hay límites en los montos que puedo enviar?",
      answer: "Puedes enviar desde S/ 10 hasta S/ 50,000 por transacción. Para montos mayores, puedes hacer múltiples envíos.",
    },
    {
      question: "¿Cuánto cuesta usar PagoCampo?",
      answer: "Los primeros 5 pagos son gratis. Después, cobramos una pequeña comisión de 1.5% por transacción, mucho menor que otros servicios.",
    },
  ];

  return (
    <section id="faq" className="section-padding bg-background">
      <div className="container-max">
        <div className="text-center space-y-4 mb-16 fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            ❓ Preguntas Frecuentes
          </h2>
          <p className="text-xl text-muted-foreground">
            Resolvemos tus dudas sobre PagoCampo
          </p>
        </div>

        <div className="max-w-3xl mx-auto fade-in-up">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border/50 rounded-lg px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline hover:text-primary transition-colors">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;