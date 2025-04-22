import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/auth';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'visible' : 'invisible'}`}>
      {/* Backdrop with fade effect */}
      <div 
        onClick={onClose}
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-50' : 'opacity-0'
        }`}
      />

      {/* Menu panel with slide effect */}
      <div 
        className={`absolute left-0 top-0 w-64 h-screen bg-[#673ab7] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <h2 className="text-lg font-semibold text-white tracking-wide">Menú</h2>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-white hover:bg-white/10 rounded-full"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu items */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-4">
                <a href="/pedidos" className="flex items-center text-white hover:bg-white/10 rounded px-2 py-1 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span className="ml-2">Pedidos</span>
                </a>

                <a href="/productos" className="flex items-center text-white hover:bg-white/10 rounded px-2 py-1 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span className="ml-2">Productos</span>
                </a>

                <a href="/clientes" className="flex items-center text-white hover:bg-white/10 rounded px-2 py-1 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-3-3h-4a3 3 0 00-3 3v2h5zM9 14a4 4 0 100-8 4 4 0 000 8zm0 2a6 6 0 00-6 6v2h12v-2a6 6 0 00-6-6z" />
                  </svg>
                  <span className="ml-2">Clientes</span>
                </a>

                <a href="/estadisticas" className="flex items-center text-white hover:bg-white/10 rounded px-2 py-1 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18M3 9h18M3 15h18M3 21h18" />
                  </svg>
                  <span className="ml-2">Estadísticas</span>
                </a>

                <a href="/configuracion" className="flex items-center text-white hover:bg-white/10 rounded px-2 py-1 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="ml-2">Configuración</span>
                </a>

                <a href="/configuracion-tienda" className="flex items-center text-white hover:bg-white/10 rounded px-2 py-1 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20v-6a2 2 0 012-2h4a2 2 0 012 2v6m-6 0h6" />
                  </svg>
                  <span className="ml-2">Configuración de Tienda</span>
                </a>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-white/20 space-y-8">
            <a href={`/tienda/${user?.email.split('@')[0]}`} target="_blank" rel="noopener noreferrer" 
               className="flex items-center text-white hover:bg-white/10 rounded px-2 py-1 transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="ml-2">Ver mi tienda</span>
            </a>

            <button
              onClick={handleLogout}
              className="flex items-center text-red-100 hover:bg-red-600/20 rounded px-2 py-1 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="ml-2">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
