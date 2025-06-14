
import { useState } from "react";
import { Upload, Users, Package, Settings, BarChart3, Plus, Eye, Copy, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Gallery {
  id: number;
  name: string;
  photos: number;
  status: 'active' | 'inactive';
  createdAt: string;
  clientToken: string;
  clientEmail: string;
  description?: string;
}

const AdminDashboard = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [galleryName, setGalleryName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [galleryDescription, setGalleryDescription] = useState("");
  const { toast } = useToast();

  const mockStats = {
    totalGalleries: 12,
    totalPhotos: 348,
    totalSales: 2450,
    pendingOrders: 5
  };

  const [galleries, setGalleries] = useState<Gallery[]>([
    { 
      id: 1, 
      name: "Boda María & Carlos", 
      photos: 87, 
      status: "active", 
      createdAt: "2024-01-15",
      clientToken: "abc123xyz789",
      clientEmail: "maria.carlos@email.com",
      description: "Hermosa boda en jardín"
    },
    { 
      id: 2, 
      name: "Sesión Familiar López", 
      photos: 45, 
      status: "active", 
      createdAt: "2024-01-10",
      clientToken: "def456uvw012",
      clientEmail: "familia.lopez@email.com",
      description: "Sesión familiar en parque"
    },
    { 
      id: 3, 
      name: "Evento Corporativo ABC", 
      photos: 156, 
      status: "inactive", 
      createdAt: "2024-01-05",
      clientToken: "ghi789rst345",
      clientEmail: "eventos@abc.com",
      description: "Evento anual de empresa"
    },
  ]);

  const mockOrders = [
    { id: 1, gallery: "Boda María & Carlos", client: "maría@email.com", amount: 89, status: "paid" },
    { id: 2, gallery: "Sesión Familiar López", client: "lopez@email.com", amount: 45, status: "pending" },
    { id: 3, gallery: "Evento Corporativo ABC", client: "empresa@abc.com", amount: 156, status: "processing" },
  ];

  const generateClientLink = (token: string) => {
    return `${window.location.origin}/client/${token}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Enlace copiado",
      description: "El enlace del cliente ha sido copiado al portapapeles",
    });
  };

  const generateNewToken = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const createNewGallery = () => {
    if (!galleryName.trim() || !clientEmail.trim()) {
      toast({
        title: "Error",
        description: "El nombre de la galería y el email del cliente son obligatorios",
        variant: "destructive"
      });
      return;
    }

    const newGallery: Gallery = {
      id: galleries.length + 1,
      name: galleryName,
      photos: selectedFiles ? selectedFiles.length : 0,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      clientToken: generateNewToken(),
      clientEmail: clientEmail,
      description: galleryDescription || `Galería para ${clientEmail}`
    };

    setGalleries(prev => [newGallery, ...prev]);
    
    // Limpiar formulario
    setGalleryName("");
    setClientEmail("");
    setGalleryDescription("");
    setSelectedFiles(null);
    
    // Reset file input
    const fileInput = document.getElementById('photos') as HTMLInputElement;
    if (fileInput) fileInput.value = '';

    toast({
      title: "¡Galería creada!",
      description: `Se ha creado la galería "${newGallery.name}" con enlace único para ${clientEmail}`,
    });
  };

  const toggleGalleryStatus = (id: number) => {
    setGalleries(prev => prev.map(gallery => 
      gallery.id === id 
        ? { ...gallery, status: gallery.status === 'active' ? 'inactive' : 'active' }
        : gallery
    ));
    
    toast({
      title: "Estado actualizado",
      description: "El estado de la galería ha sido cambiado",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-photo-dark">Panel de Administración</h1>
          <p className="text-photo-gray mt-2">Gestiona tus galerías, pedidos y configuración</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-photo-gray">Galerías activas</p>
                  <p className="text-2xl font-bold text-photo-dark">{galleries.filter(g => g.status === 'active').length}</p>
                </div>
                <Users className="h-8 w-8 text-photo-gold" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-photo-gray">Total fotos</p>
                  <p className="text-2xl font-bold text-photo-dark">{galleries.reduce((sum, g) => sum + g.photos, 0)}</p>
                </div>
                <Upload className="h-8 w-8 text-photo-gold" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-photo-gray">Ventas totales</p>
                  <p className="text-2xl font-bold text-photo-dark">${mockStats.totalSales}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-photo-gold" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-photo-gray">Pedidos pendientes</p>
                  <p className="text-2xl font-bold text-photo-dark">{mockStats.pendingOrders}</p>
                </div>
                <Package className="h-8 w-8 text-photo-gold" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="galleries" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="galleries">Galerías</TabsTrigger>
            <TabsTrigger value="upload">Subir Fotos</TabsTrigger>
            <TabsTrigger value="orders">Pedidos</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          {/* Galleries Tab */}
          <TabsContent value="galleries" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-photo-dark">Gestión de Galerías ({galleries.length})</h2>
            </div>

            <div className="grid gap-4">
              {galleries.map((gallery) => (
                <Card key={gallery.id}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-photo-dark">{gallery.name}</h3>
                          <p className="text-sm text-photo-gray">{gallery.photos} fotos • Creado: {gallery.createdAt}</p>
                          <p className="text-sm text-photo-gray">Cliente: {gallery.clientEmail}</p>
                          {gallery.description && (
                            <p className="text-sm text-photo-gray italic">{gallery.description}</p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs cursor-pointer ${
                            gallery.status === 'active' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                          onClick={() => toggleGalleryStatus(gallery.id)}
                          >
                            {gallery.status === 'active' ? 'Activa' : 'Inactiva'}
                          </span>
                          <Button variant="outline" size="sm" onClick={() => window.location.href = `/gallery/${gallery.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Enlace del cliente */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <Label className="text-sm font-medium text-photo-dark">Enlace del cliente:</Label>
                        <div className="flex items-center space-x-2 mt-2">
                          <Input 
                            value={generateClientLink(gallery.clientToken)} 
                            readOnly 
                            className="text-sm bg-white"
                          />
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => copyToClipboard(generateClientLink(gallery.clientToken))}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => window.open(generateClientLink(gallery.clientToken), '_blank')}
                          >
                            <LinkIcon className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-photo-gray mt-1">
                          Comparte este enlace con tu cliente para que pueda acceder a su galería privada
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Crear Nueva Galería</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gallery-name">Nombre de la galería *</Label>
                    <Input 
                      id="gallery-name" 
                      placeholder="Ej: Boda Juan & Ana" 
                      value={galleryName}
                      onChange={(e) => setGalleryName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-email">Email del cliente *</Label>
                    <Input 
                      id="client-email" 
                      type="email" 
                      placeholder="cliente@email.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gallery-description">Descripción</Label>
                  <Textarea 
                    id="gallery-description" 
                    placeholder="Descripción de la sesión fotográfica..."
                    rows={3}
                    value={galleryDescription}
                    onChange={(e) => setGalleryDescription(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photos">Seleccionar fotos (opcional para prueba)</Label>
                  <Input 
                    id="photos" 
                    type="file" 
                    multiple 
                    accept="image/*"
                    onChange={(e) => setSelectedFiles(e.target.files)}
                  />
                  {selectedFiles && (
                    <p className="text-sm text-photo-gray">
                      {selectedFiles.length} archivos seleccionados
                    </p>
                  )}
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-photo-dark mb-2">
                    <LinkIcon className="h-4 w-4 inline mr-2" />
                    Enlace automático para el cliente
                  </h4>
                  <p className="text-sm text-photo-gray">
                    Al crear la galería, se generará automáticamente un enlace único que podrás enviar al cliente. 
                    Con este enlace, el cliente podrá crear su cuenta y acceder exclusivamente a sus fotos.
                  </p>
                </div>

                <Button 
                  className="w-full bg-photo-gold hover:bg-photo-gold/90"
                  onClick={createNewGallery}
                  disabled={!galleryName.trim() || !clientEmail.trim()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Crear Galería y Generar Enlace
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <h2 className="text-xl font-semibold text-photo-dark">Gestión de Pedidos</h2>
            
            <div className="grid gap-4">
              {mockOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-photo-dark">{order.gallery}</h3>
                        <p className="text-sm text-photo-gray">{order.client} • ${order.amount}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.status === 'paid' 
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status === 'paid' ? 'Pagado' : 
                           order.status === 'pending' ? 'Pendiente' : 'Procesando'}
                        </span>
                        <Button variant="outline" size="sm">
                          Ver detalles
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Packs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Pack Básico (10 fotos)</Label>
                    <Input placeholder="Precio" defaultValue="49" />
                  </div>
                  <div className="space-y-2">
                    <Label>Pack Premium (20 fotos)</Label>
                    <Input placeholder="Precio" defaultValue="79" />
                  </div>
                  <div className="space-y-2">
                    <Label>Pack Completo (50 fotos)</Label>
                    <Input placeholder="Precio" defaultValue="149" />
                  </div>
                </div>
                <Button className="bg-photo-gold hover:bg-photo-gold/90">
                  Guardar configuración
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
