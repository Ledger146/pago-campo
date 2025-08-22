import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const VideoSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="section-padding bg-background">
      <div className="container-max">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            🎥 Ve PagoCampo en Acción
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            60 segundos que cambiarán tu forma de hacer pagos para siempre
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden border-2 border-primary/20 shadow-xl">
            <CardContent className="p-0">
              <div className="relative">
                {/* Video Thumbnail */}
                <div 
                  className="relative aspect-video bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center cursor-pointer group"
                  onClick={() => setIsVideoOpen(true)}
                >
                  {/* Background pattern */}
                  <div className="absolute inset-0 bg-[url('/hero-farmer.jpg')] bg-cover bg-center opacity-30"></div>
                  
                  {/* Play button */}
                  <div className="relative z-10 w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors duration-300 shadow-lg">
                    <Play className="h-8 w-8 text-primary ml-1" fill="currentColor" />
                  </div>
                  
                  {/* Overlay text */}
                  <div className="absolute bottom-6 left-6 right-6 z-10">
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4">
                      <h3 className="text-white text-xl font-semibold mb-2">
                        "Del Riesgo a la Tranquilidad Total"
                      </h3>
                      <p className="text-white/90 text-sm">
                        Descubre cómo Juan, productor de Ayacucho, eliminó el riesgo de transportar efectivo
                      </p>
                    </div>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-white text-sm font-medium">1:24</span>
                  </div>
                </div>

                {/* Video benefits */}
                <div className="p-6 bg-gradient-to-r from-primary/5 to-primary/10">
                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">60 seg</div>
                      <div className="text-sm text-muted-foreground">Duración total</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">100%</div>
                      <div className="text-sm text-muted-foreground">Caso real</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">3 pasos</div>
                      <div className="text-sm text-muted-foreground">Para implementar</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Video testimonials */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "El video me convenció completamente",
                author: "María L.",
                role: "Productora de quinua"
              },
              {
                quote: "Muy claro y fácil de entender",
                author: "Carlos M.",
                role: "Comerciante rural"
              },
              {
                quote: "Exactamente lo que necesitaba ver",
                author: "Ana R.",
                role: "Cooperativa agrícola"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-primary/10 shadow-sm">
                <p className="text-sm text-muted-foreground italic mb-2">
                  "{testimonial.quote}"
                </p>
                <div className="text-xs">
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Modal */}
        <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
          <DialogContent className="max-w-4xl w-full p-0 bg-black">
            <div className="relative">
              <Button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-2"
                size="sm"
              >
                <X className="h-4 w-4" />
              </Button>
              
              {/* Placeholder for actual video */}
              <div className="aspect-video bg-black flex items-center justify-center">
                <div className="text-center text-white space-y-4">
                  <div className="text-6xl">🎬</div>
                  <h3 className="text-2xl font-semibold">Video Demo de PagoCampo</h3>
                  <p className="text-white/80 max-w-md mx-auto">
                    Aquí iría el video real mostrando cómo funciona PagoCampo paso a paso.
                    Por ahora es un placeholder que puedes reemplazar con tu video de YouTube, Vimeo, o archivo local.
                  </p>
                  <div className="bg-white/10 rounded-lg p-4 max-w-sm mx-auto">
                    <p className="text-sm">
                      💡 <strong>Consejo:</strong> Reemplaza este contenido con un iframe de YouTube/Vimeo 
                      o un elemento &lt;video&gt; con tu archivo MP4.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default VideoSection;