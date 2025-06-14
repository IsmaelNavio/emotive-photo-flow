
import { useState } from "react";
import { Heart, ShoppingCart, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Photo {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  price: number;
  isFavorite: boolean;
}

interface PhotoGalleryProps {
  photos: Photo[];
  onToggleFavorite: (photoId: string) => void;
  onAddToCart: (photoId: string) => void;
  onPhotoClick: (photo: Photo) => void;
  viewMode?: "grid" | "masonry";
}

const PhotoGallery = ({ 
  photos, 
  onToggleFavorite, 
  onAddToCart, 
  onPhotoClick,
  viewMode = "grid" 
}: PhotoGalleryProps) => {
  const [hoveredPhoto, setHoveredPhoto] = useState<string | null>(null);

  return (
    <div className={`
      ${viewMode === "grid" 
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
        : "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
      }
    `}>
      {photos.map((photo) => (
        <Card
          key={photo.id}
          className={`
            group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer
            ${viewMode === "masonry" ? "break-inside-avoid mb-6" : ""}
          `}
          onMouseEnter={() => setHoveredPhoto(photo.id)}
          onMouseLeave={() => setHoveredPhoto(null)}
          onClick={() => onPhotoClick(photo)}
        >
          {/* Photo Image */}
          <div className="relative overflow-hidden">
            <img
              src={photo.thumbnail}
              alt={photo.title}
              className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            
            {/* Overlay */}
            <div className={`
              absolute inset-0 bg-black transition-opacity duration-300
              ${hoveredPhoto === photo.id ? "bg-opacity-40" : "bg-opacity-0"}
            `} />

            {/* Action Buttons */}
            <div className={`
              absolute inset-0 flex items-center justify-center space-x-3 transition-opacity duration-300
              ${hoveredPhoto === photo.id ? "opacity-100" : "opacity-0"}
            `}>
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 hover:bg-white text-photo-dark"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(photo.id);
                }}
              >
                <Heart 
                  className={`h-4 w-4 ${photo.isFavorite ? "fill-red-500 text-red-500" : ""}`} 
                />
              </Button>
              
              <Button
                size="sm"
                className="bg-photo-gold hover:bg-photo-gold/90 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(photo.id);
                }}
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
              
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 hover:bg-white text-photo-dark"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            {/* Favorite Badge */}
            {photo.isFavorite && (
              <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-500">
                <Heart className="h-3 w-3 fill-white" />
              </Badge>
            )}
          </div>

          {/* Photo Info */}
          <div className="p-4">
            <h3 className="font-medium text-photo-dark mb-2 line-clamp-1">{photo.title}</h3>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-photo-gold">${photo.price}</span>
              <span className="text-sm text-photo-gray">Foto individual</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PhotoGallery;
