import React from 'react';

export default function Landing() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-4 text-center">
        Crea tu tienda en línea fácil y rápido
      </h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-md">
        Lanza tu negocio digital en minutos. Administra productos, pedidos y personaliza tu tienda desde el móvil. ¡Empieza gratis!
      </p>
      <a 
        href="/register" 
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition mb-2"
      >
        Crear mi tienda
      </a>
      <a 
        href="/login" 
        className="text-blue-600 underline"
      >
        Ya tengo cuenta
      </a>
    </main>
  );
}
