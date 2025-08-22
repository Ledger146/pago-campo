import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Users, 
  Download, 
  Activity, 
  TrendingUp,
  Calendar,
  Mail,
  Phone,
  MapPin,
  FileDown,
  BarChart3,
  RefreshCw,
  Leaf,
  LogOut
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface User {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  fecha_registro: string;
}

interface Download {
  id: string;
  email: string;
  guia: string;
  fecha: string;
}

interface Event {
  id: string;
  tipo: string;
  usuario_id: string;
  metadata: any;
  fecha: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDownloads: 0,
    totalEvents: 0,
    thisWeekUsers: 0
  });

  useEffect(() => {
    checkAuth();
    loadData();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/');
      return;
    }

    // Verify admin role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      toast({
        title: "Acceso denegado",
        description: "No tienes permisos de administrador",
        variant: "destructive"
      });
      navigate('/');
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      // Load users
      const { data: usersData } = await supabase
        .from('usuarios')
        .select('*')
        .order('fecha_registro', { ascending: false });

      // Load downloads
      const { data: downloadsData } = await supabase
        .from('descargas')
        .select('*')
        .order('fecha', { ascending: false });

      // Load events
      const { data: eventsData } = await supabase
        .from('eventos')
        .select('*')
        .order('fecha', { ascending: false });

      setUsers(usersData || []);
      setDownloads(downloadsData || []);
      setEvents(eventsData || []);

      // Calculate stats
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      const thisWeekUsers = (usersData || []).filter(
        user => new Date(user.fecha_registro) >= oneWeekAgo
      ).length;

      setStats({
        totalUsers: usersData?.length || 0,
        totalDownloads: downloadsData?.length || 0,
        totalEvents: eventsData?.length || 0,
        thisWeekUsers
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los datos",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
    toast({
      title: "Datos actualizados",
      description: "La información ha sido actualizada correctamente"
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const exportUsers = () => {
    const csvContent = [
      ['Nombre', 'Email', 'Teléfono', 'Fecha de Registro'],
      ...users.map(user => [
        user.nombre || '',
        user.email || '',
        user.telefono || '',
        format(new Date(user.fecha_registro), 'dd/MM/yyyy HH:mm', { locale: es })
      ])
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `usuarios_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
    
    toast({
      title: "Exportación exitosa",
      description: "Los datos han sido exportados a CSV"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando panel de administración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container-max">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => navigate('/')}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Landing
              </Button>
              <div className="flex items-center space-x-2">
                <Leaf className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold">Panel de Administración</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                onClick={refreshData}
                variant="outline"
                size="sm"
                disabled={refreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Actualizar
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-max py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                +{stats.thisWeekUsers} esta semana
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Descargas</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDownloads}</div>
              <p className="text-xs text-muted-foreground">
                Guías descargadas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eventos</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEvents}</div>
              <p className="text-xs text-muted-foreground">
                Actividades registradas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Crecimiento</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalUsers > 0 ? Math.round((stats.thisWeekUsers / stats.totalUsers) * 100) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                Usuarios nuevos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Data Tables */}
        <Tabs defaultValue="users" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="users">Usuarios</TabsTrigger>
              <TabsTrigger value="downloads">Descargas</TabsTrigger>
              <TabsTrigger value="events">Eventos</TabsTrigger>
            </TabsList>
            
            <Button
              onClick={exportUsers}
              variant="outline"
              size="sm"
            >
              <FileDown className="h-4 w-4 mr-2" />
              Exportar CSV
            </Button>
          </div>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Usuarios Registrados ({users.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Teléfono</TableHead>
                      <TableHead>Fecha de Registro</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.slice(0, 10).map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {user.nombre || 'Sin nombre'}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{user.email}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{user.telefono || 'Sin teléfono'}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {format(new Date(user.fecha_registro), 'dd/MM/yyyy HH:mm', { locale: es })}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {users.length > 10 && (
                  <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Mostrando 10 de {users.length} usuarios. Usa la exportación para ver todos.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="downloads" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="h-5 w-5" />
                  <span>Descargas de Guías ({downloads.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Guía</TableHead>
                      <TableHead>Fecha de Descarga</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {downloads.slice(0, 10).map((download) => (
                      <TableRow key={download.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{download.email}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {download.guia || 'Guía Principal'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {format(new Date(download.fecha), 'dd/MM/yyyy HH:mm', { locale: es })}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Eventos del Sistema ({events.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Usuario ID</TableHead>
                      <TableHead>Metadata</TableHead>
                      <TableHead>Fecha</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.slice(0, 10).map((event) => (
                      <TableRow key={event.id}>
                        <TableCell>
                          <Badge variant="outline">
                            {event.tipo || 'Sin tipo'}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          {event.usuario_id ? 
                            event.usuario_id.substring(0, 8) + '...' : 
                            'Sin usuario'
                          }
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {event.metadata ? 
                            JSON.stringify(event.metadata).substring(0, 50) + '...' : 
                            'Sin metadata'
                          }
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {format(new Date(event.fecha), 'dd/MM/yyyy HH:mm', { locale: es })}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;