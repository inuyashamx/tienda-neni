import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Clients from './pages/Clients';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import StoreSettings from './pages/StoreSettings';
import StoreFront from './pages/StoreFront';
import StoreProducts from './pages/StoreProducts';
import StoreCategories from './pages/StoreCategories';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import MobileMenu from './components/MobileMenu';
import Toolbar from './components/Toolbar';
import { AuthProvider, useAuth } from './services/auth';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!user) return <>{children}</>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Toolbar */}
      <Toolbar onMenuClick={() => setIsMobileMenuOpen(true)} />

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 px-4 py-4 mt-14">
        {children}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route
          path="/*"
          element={
            <AppLayout>
              <Routes>
                <Route path="/pedidos" element={<PrivateRoute><Orders /></PrivateRoute>} />
                <Route path="/productos" element={<PrivateRoute><Products /></PrivateRoute>} />
                <Route path="/clientes" element={<PrivateRoute><Clients /></PrivateRoute>} />
                <Route path="/estadisticas" element={<PrivateRoute><Statistics /></PrivateRoute>} />
                <Route path="/configuracion" element={<PrivateRoute><Settings /></PrivateRoute>} />
                <Route path="/configuracion-tienda" element={<PrivateRoute><StoreSettings /></PrivateRoute>} />
                <Route path="/tienda/:slug/" element={<StoreFront />} />
                <Route path="/tienda/:slug/productos" element={<StoreProducts />} />
                <Route path="/tienda/:slug/categorias" element={<StoreCategories />} />
                <Route path="/tienda/:slug/producto/:id" element={<ProductDetail />} />
                <Route path="/tienda/:slug/carrito" element={<PrivateRoute><Cart /></PrivateRoute>} />
                <Route path="/tienda/:slug/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
                <Route path="/tienda/:slug/confirmacion" element={<PrivateRoute><Confirmation /></PrivateRoute>} />
              </Routes>
            </AppLayout>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
