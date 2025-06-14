
import { Check, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Package {
  id: string;
  name: string;
  description: string;
  photoCount: number;
  price: number;
  originalPrice?: number;
  features: string[];
  isPopular?: boolean;
  includes: string[];
}

interface PackageCardProps {
  package: Package;
  onAddToCart: (packageId: string) => void;
}

const PackageCard = ({ package: pkg, onAddToCart }: PackageCardProps) => {
  const discount = pkg.originalPrice ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100) : 0;

  return (
    <Card className={`relative transition-all duration-300 hover:shadow-xl ${
      pkg.isPopular ? "border-photo-gold shadow-lg scale-105" : "hover:scale-102"
    }`}>
      {pkg.isPopular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-photo-gold hover:bg-photo-gold text-white">
          Más Popular
        </Badge>
      )}
      
      {discount > 0 && (
        <Badge className="absolute -top-3 right-4 bg-green-500 hover:bg-green-500 text-white">
          -{discount}%
        </Badge>
      )}

      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-photo-dark">{pkg.name}</CardTitle>
        <p className="text-photo-gray mt-2">{pkg.description}</p>
        
        <div className="mt-4">
          <div className="flex items-center justify-center space-x-2">
            {pkg.originalPrice && (
              <span className="text-lg text-photo-gray line-through">${pkg.originalPrice}</span>
            )}
            <span className="text-3xl font-bold text-photo-gold">${pkg.price}</span>
          </div>
          <p className="text-sm text-photo-gray mt-1">{pkg.photoCount} fotos incluidas</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-photo-dark mb-2">Características:</h4>
          <ul className="space-y-2">
            {pkg.features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-photo-gray">
                <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-photo-dark mb-2">Incluye:</h4>
          <ul className="space-y-2">
            {pkg.includes.map((item, index) => (
              <li key={index} className="flex items-center text-sm text-photo-gray">
                <Check className="h-4 w-4 text-photo-gold mr-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter>
        <Button 
          className="w-full bg-photo-gold hover:bg-photo-gold/90 text-white font-semibold"
          onClick={() => onAddToCart(pkg.id)}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Añadir al carrito
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PackageCard;
