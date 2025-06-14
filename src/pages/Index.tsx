
import { useState } from "react";
import { Camera, Heart, ShoppingBag, Users, Star, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const features = [
    {
      icon: Camera,
      title: "Galerías Privadas",
      description: "Acceso exclusivo a tus fotos mediante enlace único y seguro"
    },
    {
      icon: Heart,
      title: "Selección de Favoritas",
      description: "Marca tus fotos preferidas y crea tu colección personalizada"
    },
    {
      icon: ShoppingBag,
      title: "Packs Personalizados",
      description: "Elige entre fotos individuales o packs diseñados para ti"
    },
    {
      icon: CheckCircle,
      title: "Descarga Inmediata",
      description: "Una vez completado el pago, descarga tus fotos al instante"
    }
  ];

  const testimonials = [
    {
      name: "María González",
      text: "La experiencia fue increíble. Poder ver todas mis fotos de boda y seleccionar mis favoritas desde casa fue muy cómodo.",
      rating: 5,
      event: "Boda"
    },
    {
      name: "Carlos Rodríguez",
      text: "El sistema es muy intuitivo y las fotos se ven perfectas. El proceso de compra fue súper fácil.",
      rating: 5,
      event: "Sesión familiar"
    },
    {
      name: "Ana López",
      text: "Me encantó poder elegir entre diferentes packs. La calidad de las fotos es excepcional.",
      rating: 5,
      event: "Evento corporativo"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header 
        cartCount={0}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-photo-light via-white to-photo-gold/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-photo-dark leading-tight">
                Tus momentos más
                <span className="text-photo-gold block">especiales</span>
              </h1>
              <p className="text-xl text-photo-gray leading-relaxed">
                Disfruta de una experiencia única para ver, seleccionar y adquirir 
                tus fotografías profesionales. Acceso privado, calidad premium y 
                descarga inmediata.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-photo-gold hover:bg-photo-gold/90 text-white font-semibold"
                >
                  Ver mis fotos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-photo-dark text-photo-dark hover:bg-photo-dark hover:text-white"
                >
                  ¿Cómo funciona?
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-photo-gold/20 rounded-3xl transform rotate-3"></div>
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Sesión fotográfica profesional"
                className="relative rounded-3xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-photo-dark mb-4">
              Una experiencia diseñada para ti
            </h2>
            <p className="text-xl text-photo-gray max-w-3xl mx-auto">
              Hemos creado la plataforma perfecta para que disfrutes de tus fotografías 
              de manera cómoda, segura y profesional.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-photo-gold/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-photo-gold/20 transition-colors">
                    <feature.icon className="h-8 w-8 text-photo-gold" />
                  </div>
                  <CardTitle className="text-xl text-photo-dark">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-photo-gray">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-photo-dark mb-4">
              Cómo funciona
            </h2>
            <p className="text-xl text-photo-gray max-w-3xl mx-auto">
              En solo 4 pasos simples tendrás tus fotos favoritas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Accede a tu galería",
                description: "Usa el enlace privado que te enviamos para ver todas tus fotos"
              },
              {
                step: "2", 
                title: "Explora y favoritas",
                description: "Navega por tu galería y marca tus fotos preferidas"
              },
              {
                step: "3",
                title: "Elige tu pack",
                description: "Selecciona fotos individuales o uno de nuestros packs"
              },
              {
                step: "4",
                title: "Descarga y disfruta",
                description: "Completa el pago y descarga tus fotos en alta resolución"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-photo-gold rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl">
                    {item.step}
                  </div>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-photo-gold/30 transform -translate-y-px"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-photo-dark mb-2">{item.title}</h3>
                <p className="text-photo-gray">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-photo-dark mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-xl text-photo-gray">
              Experiencias reales de personas que confiaron en nosotros
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-photo-gold fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-photo-gray italic mb-4">
                    "{testimonial.text}"
                  </blockquote>
                  <div>
                    <p className="font-semibold text-photo-dark">{testimonial.name}</p>
                    <p className="text-sm text-photo-gray">{testimonial.event}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-photo-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para ver tus fotos?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Si ya tienes el enlace a tu galería, accede ahora. Si necesitas ayuda, contáctanos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-photo-gold hover:bg-photo-gold/90 text-white font-semibold"
            >
              Acceder a mi galería
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-photo-dark"
            >
              Contactar soporte
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Camera className="h-8 w-8 text-photo-gold" />
                <span className="text-2xl font-bold text-photo-dark">PhotoStudio</span>
              </div>
              <p className="text-photo-gray mb-4">
                Capturamos tus momentos más especiales con la más alta calidad y profesionalismo. 
                Una experiencia fotográfica única para cada ocasión.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-photo-dark mb-4">Enlaces</h3>
              <ul className="space-y-2 text-photo-gray">
                <li><a href="#" className="hover:text-photo-gold transition-colors">Inicio</a></li>
                <li><a href="#" className="hover:text-photo-gold transition-colors">Galerías</a></li>
                <li><a href="#" className="hover:text-photo-gold transition-colors">Servicios</a></li>
                <li><a href="#" className="hover:text-photo-gold transition-colors">Contacto</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-photo-dark mb-4">Soporte</h3>
              <ul className="space-y-2 text-photo-gray">
                <li><a href="#" className="hover:text-photo-gold transition-colors">Ayuda</a></li>
                <li><a href="#" className="hover:text-photo-gold transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-photo-gold transition-colors">Términos</a></li>
                <li><a href="#" className="hover:text-photo-gold transition-colors">Privacidad</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-photo-gray text-sm">
                © 2024 PhotoStudio. Todos los derechos reservados.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-photo-gray hover:text-photo-gold transition-colors">
                  Instagram
                </a>
                <a href="#" className="text-photo-gray hover:text-photo-gold transition-colors">
                  Facebook
                </a>
                <a href="#" className="text-photo-gray hover:text-photo-gold transition-colors">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
