
import Header from "@/components/Header";
import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se implementaría el envío del formulario
    console.log("Formulario enviado");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-photo-dark mb-4">Contacto</h1>
          <p className="text-xl text-photo-gray">Ponte en contacto con nosotros para tu próxima sesión</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-photo-dark">
                  <Mail className="h-5 w-5 mr-2 text-photo-gold" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-photo-gray">info@photostudio.com</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-photo-dark">
                  <Phone className="h-5 w-5 mr-2 text-photo-gold" />
                  Teléfono
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-photo-gray">+34 123 456 789</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-photo-dark">
                  <MapPin className="h-5 w-5 mr-2 text-photo-gold" />
                  Dirección
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-photo-gray">
                  Calle Fotografía, 123<br />
                  28001 Madrid, España
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Formulario de contacto */}
          <Card>
            <CardHeader>
              <CardTitle className="text-photo-dark">Envíanos un mensaje</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" placeholder="Tu nombre" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="tu@email.com" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Asunto</Label>
                  <Input id="subject" placeholder="Asunto del mensaje" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Cuéntanos sobre tu proyecto..."
                    rows={5}
                    required 
                  />
                </div>
                
                <Button type="submit" className="w-full bg-photo-gold hover:bg-photo-gold/90">
                  Enviar mensaje
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
