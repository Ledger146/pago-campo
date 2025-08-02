import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Don Segundo",
      role: "Productor de cacao en Satipo",
      content: "Antes llevaba 200 mil soles en una bolsa… ahora con PagoCampo todo es más seguro.",
      rating: 5,
      avatar: "👨🏾‍🌾",
    },
    {
      name: "María Luz",
      role: "Caficultora en Jaén",
      content: "No necesito ir al banco. Pago a mis proveedores desde mi celular.",
      rating: 5,
      avatar: "👩🏽‍🌾",
    },
    {
      name: "Carlos Mendoza",
      role: "Agricultor en Huánuco",
      content: "Mi familia ya no se preocupa cuando voy a vender la cosecha. PagoCampo nos da tranquilidad.",
      rating: 5,
      avatar: "👨🏽‍🌾",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <section id="testimonios" className="section-padding bg-background">
      <div className="container-max">
        <div className="text-center space-y-4 mb-16 fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Lo que dicen nuestros agricultores
          </h2>
          <p className="text-xl text-muted-foreground">
            Historias reales de agricultores que ya usan PagoCampo
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card className="border-border/50 fade-in">
            <CardContent className="p-8 md:p-12">
              <div className="text-center space-y-6">
                {/* Avatar */}
                <div className="text-6xl mb-4">
                  {testimonials[currentIndex].avatar}
                </div>

                {/* Stars */}
                <div className="flex justify-center space-x-1">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
                  "{testimonials[currentIndex].content}"
                </blockquote>

                {/* Author */}
                <div className="space-y-1">
                  <p className="font-semibold text-lg text-foreground">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-muted-foreground">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevious}
              className="w-10 h-10 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentIndex 
                      ? 'bg-primary' 
                      : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={goToNext}
              className="w-10 h-10 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;