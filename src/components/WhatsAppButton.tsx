import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const WhatsAppButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleWhatsAppClick = () => {
    setIsModalOpen(true);
  };

  const handleSendToWhatsApp = () => {
    if (!name.trim()) return;
    
    const greeting = `¡Hola! Soy ${name}.`;
    const inquiry = message.trim() 
      ? ` Mi consulta es: ${message}` 
      : " Me interesa conocer más sobre PagoCampo.";
    
    const fullMessage = encodeURIComponent(greeting + inquiry);
    const phoneNumber = "51999999999"; // Cambiar por el número real
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${fullMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setIsModalOpen(false);
    setName("");
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendToWhatsApp();
    }
  };

  return (
    <>
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse hover:animate-none"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={24} />
      </button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold text-primary">
              ¡Bienvenido a PagoCampo!
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            <p className="text-center text-muted-foreground">
              Nos da mucho gusto que quieras contactarnos. Por favor, compártenos tu información:
            </p>
            
            <div className="space-y-2">
              <Label htmlFor="name">Tu nombre *</Label>
              <Input
                id="name"
                placeholder="Escribe tu nombre aquí"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Tu consulta (opcional)</Label>
              <Textarea
                id="message"
                placeholder="¿En qué podemos ayudarte? Cuéntanos sobre tu negocio o dudas específicas..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                rows={3}
              />
            </div>
            
            <Button 
              onClick={handleSendToWhatsApp}
              disabled={!name.trim()}
              className="w-full"
              size="lg"
            >
              <Send className="mr-2 h-4 w-4" />
              Enviar a WhatsApp
            </Button>
            
            <p className="text-xs text-center text-muted-foreground">
              Presiona Enter para enviar rápidamente
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WhatsAppButton;