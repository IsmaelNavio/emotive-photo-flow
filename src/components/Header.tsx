
import { Camera, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface HeaderProps {
  cartCount?: number;
  onCartClick?: () => void;
  isAdmin?: boolean;
}

const Header = ({ cartCount = 0, onCartClick, isAdmin = false }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Camera className="h-8 w-8 text-photo-gold" />
            <span className="text-xl font-bold text-photo-dark">PhotoStudio</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-photo-gray hover:text-photo-dark transition-colors">
              Inicio
            </a>
            {isAdmin && (
              <a href="/admin" className="text-photo-gray hover:text-photo-dark transition-colors">
                Panel Admin
              </a>
            )}
            <a href="/galerías" className="text-photo-gray hover:text-photo-dark transition-colors">
              Galerías
            </a>
            <a href="/contacto" className="text-photo-gray hover:text-photo-dark transition-colors">
              Contacto
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onCartClick}
              className="relative hover:bg-photo-gold/10"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-photo-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>

            {/* User Button */}
            <Button variant="ghost" size="sm" className="hover:bg-photo-gold/10">
              <User className="h-5 w-5" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-2">
              <a href="/" className="text-photo-gray hover:text-photo-dark transition-colors py-2">
                Inicio
              </a>
              {isAdmin && (
                <a href="/admin" className="text-photo-gray hover:text-photo-dark transition-colors py-2">
                  Panel Admin
                </a>
              )}
              <a href="/galerías" className="text-photo-gray hover:text-photo-dark transition-colors py-2">
                Galerías
              </a>
              <a href="/contacto" className="text-photo-gray hover:text-photo-dark transition-colors py-2">
                Contacto
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
