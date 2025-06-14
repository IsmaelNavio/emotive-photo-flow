
import { useState } from "react";
import { X, Heart, ShoppingCart, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Photo } from "./PhotoGallery";

interface PhotoModalProps {
  photo: Photo | null;
  photos: Photo[];
  isOpen: boolean;
  onClose: () => void;
  onToggleFavorite: (photoId: string) => void;
  onAddToCart: (photoId: string) => void;
}

const PhotoModal = ({ 
  photo, 
  photos, 
  isOpen, 
  onClose, 
  onToggleFavorite, 
  onAddToCart 
}: PhotoModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!photo) return null;

  // Find current photo index
  const photoIndex = photos.findIndex(p => p.id === photo.id);
  
  const goToPrevious = () => {
    const newIndex = photoIndex > 0 ? photoIndex - 1 : photos.length - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = photoIndex < photos.length - 1 ? photoIndex + 1 : 0;
    setCurrentIndex(newIndex);
  };

  const currentPhoto = photos[currentIndex] || photo;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-black/95">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20"
            onClick={goToNext}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          {/* Main Image */}
          <img
            src={currentPhoto.url}
            alt={currentPhoto.title}
            className="max-w-full max-h-full object-contain"
          />

          {/* Photo Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="flex items-center justify-between text-white">
              <div>
                <h2 className="text-xl font-semibold mb-1">{currentPhoto.title}</h2>
                <p className="text-photo-gold text-lg font-bold">${currentPhoto.price}</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  onClick={() => onToggleFavorite(currentPhoto.id)}
                >
                  <Heart 
                    className={`h-4 w-4 mr-2 ${currentPhoto.isFavorite ? "fill-red-500 text-red-500" : ""}`} 
                  />
                  {currentPhoto.isFavorite ? "Quitar favorito" : "Añadir favorito"}
                </Button>
                
                <Button
                  className="bg-photo-gold hover:bg-photo-gold/90 text-white"
                  onClick={() => onAddToCart(currentPhoto.id)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Añadir al carrito
                </Button>
                
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Photo Counter */}
          <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {photoIndex + 1} de {photos.length}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoModal;
