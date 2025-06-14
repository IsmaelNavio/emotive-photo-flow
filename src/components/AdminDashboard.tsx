
import { useState } from "react";
import { Upload, Users, Package, Settings, BarChart3, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const AdminDashboard = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const mockStats = {
    totalGalleries: 12,
    totalPhotos: 348,
    totalSales: 2450,
    pendingOrders: 5
  };

  const mockGalleries = [
    { id: 1, name: "Boda María & Carlos", photos: 87, status: "active", createdAt: "2024-01-15" },
    { id: 2, name: "Sesión Familiar López", photos: 45, status: "active", createdAt: "2024-01-10" },
    { id: 3, name: "Evento Corporativo ABC", photos: 156, status: "inactive", createdAt: "2024-01-05" },
  ];

  const mockOrders = [
    { id: 1, gallery: "Boda María & Carlos", client: "maría@email.com", amount: 89, status: "paid" },
    { id: 2, gallery: "Sesión Familiar López", client: "lopez@email.com", amount: 45, status: "pending" },
    { id: 3, gallery: "Evento Corporativo ABC", client: "empresa@abc.com", amount: 156, status: "processing" },
  ];

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
                  <p className="text-2xl font-bold text-photo-dark">{mockStats.totalGalleries}</p>
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
                  <p className="text-2xl font-bold text-photo-dark">{mockStats.totalPhotos}</p>
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
              <h2 className="text-xl font-semibold text-photo-dark">Gestión de Galerías</h2>
              <Button className="bg-photo-gold hover:bg-photo-gold/90">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Galería
              </Button>
            </div>

            <div className="grid gap-4">
              {mockGalleries.map((gallery) => (
                <Card key={gallery.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-photo-dark">{gallery.name}</h3>
                        <p className="text-sm text-photo-gray">{gallery.photos} fotos • Creado: {gallery.createdAt}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          gallery.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {gallery.status === 'active' ? 'Activa' : 'Inactiva'}
                        </span>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Ver
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
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
                <CardTitle>Subir Nuevas Fotos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gallery-name">Nombre de la galería</Label>
                    <Input id="gallery-name" placeholder="Ej: Boda Juan & Ana" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-email">Email del cliente</Label>
                    <Input id="client-email" type="email" placeholder="cliente@email.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gallery-description">Descripción</Label>
                  <Textarea 
                    id="gallery-description" 
                    placeholder="Descripción de la sesión fotográfica..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photos">Seleccionar fotos</Label>
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

                <Button className="w-full bg-photo-gold hover:bg-photo-gold/90">
                  <Upload className="h-4 w-4 mr-2" />
                  Subir Galería
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
