
import { Camera, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

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
          <Link to="/" className="flex items-center space-x-2">
            <Camera className="h-8 w-8 text-photo-gold" />
            <span className="text-xl font-bold text-photo-dark">PhotoStudio</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-photo-gray hover:text-photo-dark transition-colors">
              Inicio
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-photo-gray hover:text-photo-dark transition-colors">
                Panel Admin
              </Link>
            )}
            <Link to="/galleries" className="text-photo-gray hover:text-photo-dark transition-colors">
              Galerías
            </Link>
            <Link to="/contact" className="text-photo-gray hover:text-photo-dark transition-colors">
              Contacto
            </Link>
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
              <Link to="/" className="text-photo-gray hover:text-photo-dark transition-colors py-2">
                Inicio
              </Link>
              {isAdmin && (
                <Link to="/admin" className="text-photo-gray hover:text-photo-dark transition-colors py-2">
                  Panel Admin
                </Link>
              )}
              <Link to="/galleries" className="text-photo-gray hover:text-photo-dark transition-colors py-2">
                Galerías
              </Link>
              <Link to="/contact" className="text-photo-gray hover:text-photo-dark transition-colors py-2">
                Contacto
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
