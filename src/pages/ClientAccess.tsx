
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Lock, User, Mail } from "lucide-react";

const ClientAccess = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // Simular validación del token
  const isValidToken = token && token.length > 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Acceso del cliente:", { token, formData });
    
    // Aquí se implementaría la lógica de registro/login
    // Por ahora redirigimos a la galería correspondiente
    navigate(`/gallery/${token}`);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isValidToken) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Lock className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-photo-dark mb-2">Enlace no válido</h2>
            <p className="text-photo-gray">El enlace proporcionado no es válido o ha expirado.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Camera className="h-8 w-8 text-photo-gold" />
            <span className="text-2xl font-bold text-photo-dark">PhotoStudio</span>
          </div>
          <p className="text-photo-gray">Accede a tu galería privada</p>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-photo-dark">
              {isRegistering ? "Crear tu cuenta" : "Acceder a tu galería"}
            </CardTitle>
            <p className="text-sm text-photo-gray">
              {isRegistering 
                ? "Crea una cuenta para acceder a tus fotos"
                : "¿Primera vez? Te ayudamos a crear tu cuenta"
              }
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegistering && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-photo-gray" />
                      <Input
                        id="name"
                        placeholder="Tu nombre completo"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-photo-gray" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-photo-gray" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Crea una contraseña"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-photo-gray" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirma tu contraseña"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <Button type="submit" className="w-full bg-photo-gold hover:bg-photo-gold/90">
                {isRegistering ? "Crear cuenta y acceder" : "Acceder a mis fotos"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-photo-gold hover:text-photo-gold/80 text-sm underline"
              >
                {isRegistering 
                  ? "¿Ya tienes cuenta? Inicia sesión"
                  : "¿Primera vez? Crear cuenta"
                }
              </button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-photo-gray">
          <p>Este enlace es privado y personal. No lo compartas con terceros.</p>
        </div>
      </div>
    </div>
  );
};

export default ClientAccess;
