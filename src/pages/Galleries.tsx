
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Calendar, Image } from "lucide-react";

const Galleries = () => {
  // Datos de ejemplo de galerías públicas/destacadas
  const publicGalleries = [
    {
      id: 1,
      title: "Bodas de Ensueño",
      description: "Colección de nuestras mejores bodas",
      imageCount: 45,
      date: "2024-01-15",
      coverImage: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Retratos Familiares",
      description: "Momentos únicos en familia",
      imageCount: 32,
      date: "2024-01-10",
      coverImage: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Eventos Corporativos",
      description: "Profesionalidad en cada imagen",
      imageCount: 28,
      date: "2024-01-05",
      coverImage: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-photo-dark mb-4">Nuestras Galerías</h1>
          <p className="text-xl text-photo-gray">Explora nuestra colección de trabajos fotográficos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publicGalleries.map((gallery) => (
            <Card key={gallery.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 relative">
                <img 
                  src={gallery.coverImage} 
                  alt={gallery.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <CardHeader>
                <CardTitle className="text-photo-dark">{gallery.title}</CardTitle>
                <p className="text-photo-gray text-sm">{gallery.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-photo-gray">
                  <span className="flex items-center">
                    <Image className="h-4 w-4 mr-1" />
                    {gallery.imageCount} fotos
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {gallery.date}
                  </span>
                </div>
                
                <Button 
                  className="w-full bg-photo-gold hover:bg-photo-gold/90"
                  onClick={() => window.location.href = `/gallery/${gallery.id}`}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Ver galería
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Galleries;
