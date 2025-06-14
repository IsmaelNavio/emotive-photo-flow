
import { useState } from "react";
import { Filter, Grid3X3, LayoutGrid, Heart, Download } from "lucide-react";
import Header from "@/components/Header";
import PhotoGallery, { Photo } from "@/components/PhotoGallery";
import PhotoModal from "@/components/PhotoModal";
import PackageCard, { Package } from "@/components/PackageCard";
import ShoppingCart, { CartItem } from "@/components/ShoppingCart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Gallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  // Mock data - replace with real data
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      thumbnail: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      title: "Momento especial 1",
      price: 15,
      isFavorite: false
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      thumbnail: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      title: "Retrato elegante",
      price: 15,
      isFavorite: true
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      thumbnail: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      title: "Detalles únicos",
      price: 15,
      isFavorite: false
    },
    {
      id: "4",
      url: "https://images.unsplash.com/photo-1511405922609-24d5b3b8c936?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      thumbnail: "https://images.unsplash.com/photo-1511405922609-24d5b3b8c936?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      title: "Sonrisa radiante",
      price: 15,
      isFavorite: true
    },
    {
      id: "5",
      url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      thumbnail: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      title: "Celebración",
      price: 15,
      isFavorite: false
    },
    {
      id: "6",
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      title: "Ambiente mágico",
      price: 15,
      isFavorite: false
    }
  ]);

  const packages: Package[] = [
    {
      id: "basic",
      name: "Pack Básico",
      description: "Perfecto para seleccionar tus fotos favoritas",
      photoCount: 10,
      price: 79,
      originalPrice: 150,
      features: [
        "10 fotos de alta resolución",
        "Descarga inmediata",
        "Formato JPG optimizado",
        "Uso personal ilimitado"
      ],
      includes: [
        "Resolución 4K",
        "Sin marca de agua",
        "Soporte técnico"
      ]
    },
    {
      id: "premium",
      name: "Pack Premium",
      description: "La mejor opción para conservar todos los momentos",
      photoCount: 25,
      price: 149,
      originalPrice: 250,
      isPopular: true,
      features: [
        "25 fotos de alta resolución",
        "Descarga inmediata",
        "Múltiples formatos",
        "Retoque profesional incluido"
      ],
      includes: [
        "Resolución 4K",
        "Formatos JPG y PNG",
        "Retoque básico",
        "Soporte prioritario"
      ]
    },
    {
      id: "complete",
      name: "Pack Completo",
      description: "Todas las fotos de tu sesión",
      photoCount: 50,
      price: 249,
      originalPrice: 400,
      features: [
        "Todas las fotos (50+)",
        "Descarga inmediata",
        "Retoque profesional",
        "Álbum digital incluido"
      ],
      includes: [
        "Resolución máxima",
        "Todos los formatos",
        "Retoque avanzado",
        "Álbum digital HD"
      ]
    }
  ];

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const galleryInfo = {
    title: "Sesión de Fotos - María & Carlos",
    date: "15 de Enero, 2024",
    totalPhotos: photos.length,
    favoriteCount: photos.filter(p => p.isFavorite).length
  };

  const filteredPhotos = showFavoritesOnly 
    ? photos.filter(photo => photo.isFavorite)
    : photos;

  const handleToggleFavorite = (photoId: string) => {
    setPhotos(photos.map(photo => 
      photo.id === photoId 
        ? { ...photo, isFavorite: !photo.isFavorite }
        : photo
    ));
  };

  const handleAddToCart = (itemId: string, type: "photo" | "package" = "photo") => {
    if (type === "photo") {
      const photo = photos.find(p => p.id === itemId);
      if (photo) {
        const existingItem = cartItems.find(item => item.id === itemId);
        if (existingItem) {
          setCartItems(cartItems.map(item =>
            item.id === itemId 
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ));
        } else {
          setCartItems([...cartItems, {
            id: itemId,
            type: "photo",
            name: photo.title,
            price: photo.price,
            quantity: 1,
            thumbnail: photo.thumbnail
          }]);
        }
      }
    } else {
      const pkg = packages.find(p => p.id === itemId);
      if (pkg) {
        const existingItem = cartItems.find(item => item.id === itemId);
        if (existingItem) {
          setCartItems(cartItems.map(item =>
            item.id === itemId 
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ));
        } else {
          setCartItems([...cartItems, {
            id: itemId,
            type: "package",
            name: pkg.name,
            price: pkg.price,
            quantity: 1,
            photoCount: pkg.photoCount
          }]);
        }
      }
    }
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    setCartItems(cartItems.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    ));
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout with items:", cartItems);
    // Implement checkout logic here
    alert("Función de pago en desarrollo");
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Gallery Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-photo-dark mb-2">{galleryInfo.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-photo-gray">
                <span>{galleryInfo.date}</span>
                <Badge variant="secondary">{galleryInfo.totalPhotos} fotos</Badge>
                <Badge variant="secondary" className="bg-red-50 text-red-700">
                  <Heart className="h-3 w-3 mr-1" />
                  {galleryInfo.favoriteCount} favoritas
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={showFavoritesOnly ? "bg-red-50 border-red-200 text-red-700" : ""}
              >
                <Heart className={`h-4 w-4 mr-2 ${showFavoritesOnly ? "fill-current" : ""}`} />
                {showFavoritesOnly ? "Mostrar todas" : "Solo favoritas"}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode(viewMode === "grid" ? "masonry" : "grid")}
              >
                {viewMode === "grid" ? <LayoutGrid className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="photos" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="photos">Fotos ({filteredPhotos.length})</TabsTrigger>
            <TabsTrigger value="packages">Packs disponibles</TabsTrigger>
          </TabsList>

          <TabsContent value="photos" className="space-y-6">
            {filteredPhotos.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Heart className="h-12 w-12 text-photo-gray mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-photo-dark mb-2">
                    No hay fotos favoritas aún
                  </h3>
                  <p className="text-photo-gray">
                    Marca algunas fotos como favoritas para verlas aquí
                  </p>
                </CardContent>
              </Card>
            ) : (
              <PhotoGallery
                photos={filteredPhotos}
                onToggleFavorite={handleToggleFavorite}
                onAddToCart={(photoId) => handleAddToCart(photoId, "photo")}
                onPhotoClick={handlePhotoClick}
                viewMode={viewMode}
              />
            )}
          </TabsContent>

          <TabsContent value="packages" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-photo-dark mb-4">Elige tu pack perfecto</h2>
              <p className="text-photo-gray max-w-2xl mx-auto">
                Selecciona el pack que mejor se adapte a tus necesidades. 
                Todos incluyen descarga inmediata y alta resolución.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  package={pkg}
                  onAddToCart={(packageId) => handleAddToCart(packageId, "package")}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Photo Modal */}
      <PhotoModal
        photo={selectedPhoto}
        photos={photos}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onToggleFavorite={handleToggleFavorite}
        onAddToCart={(photoId) => handleAddToCart(photoId, "photo")}
      />

      {/* Shopping Cart */}
      <ShoppingCart
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default Gallery;
