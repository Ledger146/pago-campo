import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "¿Necesito internet para usar PagoCampo?",
      answer: "No, solo necesitas señal de celular para mandar o recibir SMS.",
    },
    {
      question: "¿Qué es blockchain y por qué lo usan?",
      answer: "Es como un cuaderno digital que nadie puede borrar. Cada pago se anota ahí y queda seguro para siempre.",
    },
    {
      question: "¿Voy a ver cosas raras como códigos o direcciones largas?",
      answer: "No. Tú solo recibirás un SMS claro con tu confirmación. Los detalles técnicos quedan guardados automáticamente.",
    },
    {
      question: "¿Qué pasa si pierdo mi celular?",
      answer: "Tu historial de pagos queda guardado. Con tu número puedes recuperar tus comprobantes.",
    },
    {
      question: "¿Qué tipo de celular necesito?",
      answer: "Funciona con cualquier celular que pueda enviar SMS, incluso los más sencillos. No necesitas un smartphone moderno.",
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