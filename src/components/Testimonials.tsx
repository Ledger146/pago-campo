import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Quote, Star, ArrowLeft, ArrowRight, Leaf } from 'lucide-react';
import donSegundoAvatar from '@/assets/don-segundo-avatar.jpg';
import mariaLuzAvatar from '@/assets/maria-luz-avatar.jpg';
import carlosMendozaAvatar from '@/assets/carlos-mendoza-avatar.jpg';

const testimonials = [
  {
    name: "Don Segundo",
    role: "Productor de cacao en Satipo",
    avatar: donSegundoAvatar,
    rating: 5,
    text: "Antes llevaba 200 mil soles en una bolsa… ahora con PagoCampo todo es más seguro.",
  },
  {
    name: "María Luz",
    role: "Caficultora en Jaén",
    avatar: mariaLuzAvatar,
    rating: 5,
    text: "No necesito ir al banco. Pago a mis proveedores desde mi celular.",
  },
  {
    name: "Carlos Mendoza",
    role: "Agricultor en Huánuco",
    avatar: carlosMendozaAvatar,
    rating: 5,
    text: "Mi familia ya no se preocupa cuando voy a vender la cosecha. PagoCampo nos da tranquilidad.",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    })
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonios" className="relative py-20 bg-gradient-to-br from-muted/30 to-background overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: '200% 200%'
          }}
        />
        
        {/* Floating leaves */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${30 + (i * 8)}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 5, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          >
            <Leaf className="w-4 h-4 text-primary/20" />
          </motion.div>
        ))}
      </div>

      <motion.div 
        ref={containerRef}
        className="relative z-10 max-w-6xl mx-auto px-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          variants={fadeInUp}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Leaf className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Testimonios Reales
            </span>
          </motion.div>

          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-foreground font-heading"
            variants={fadeInUp}
          >
            Lo que dicen nuestros agricultores
          </motion.h2>
          
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Historias reales de agricultores que ya usan PagoCampo
          </motion.p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="relative max-w-5xl mx-auto mb-12">
          <div className="relative h-[400px] md:h-[350px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 },
                }}
                className="absolute inset-0"
              >
                <div className="relative h-full bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 p-8 md:p-10 overflow-hidden">
                  {/* Quote icon */}
                  <motion.div
                    className="absolute top-6 right-6 opacity-10"
                    animate={{ rotate: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Quote className="w-12 h-12 text-primary" />
                  </motion.div>

                  <div className="relative z-10 h-full flex flex-col md:flex-row items-center gap-8">
                    {/* User Info */}
                    <div className="flex-shrink-0 text-center md:text-left">
                      <motion.div
                        className="relative mb-6"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-20 h-20 mx-auto md:mx-0 rounded-full overflow-hidden border-3 border-primary/20 relative">
                          <img 
                            src={testimonials[currentIndex].avatar} 
                            alt={testimonials[currentIndex].name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </motion.div>

                      <h3 className="text-xl font-bold text-foreground mb-2 font-heading">
                        {testimonials[currentIndex].name}
                      </h3>
                      <p className="text-primary mb-4 font-medium">
                        {testimonials[currentIndex].role}
                      </p>
                      
                      {/* Star Rating */}
                      <div className="flex justify-center md:justify-start gap-1 mb-6">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1, duration: 0.3 }}
                          >
                            <Star className="w-5 h-5 fill-secondary text-secondary" />
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <motion.blockquote 
                        className="text-xl md:text-2xl text-foreground leading-relaxed font-light italic"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                      >
                        "{testimonials[currentIndex].text}"
                      </motion.blockquote>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-6 mt-8">
            <motion.button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-card/80 border border-border/50 backdrop-blur-sm text-foreground hover:bg-card transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-primary scale-125' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-card/80 border border-border/50 backdrop-blur-sm text-foreground hover:bg-card transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;