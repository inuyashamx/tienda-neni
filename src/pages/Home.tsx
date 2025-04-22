import React from 'react';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Inicio</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Pedidos</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Hoy:</strong> Pedido 1, Pedido 2</li>
          <li><strong>Mañana:</strong> Pedido 3</li>
          <li><strong>Pasado Mañana:</strong> Pedido 4</li>
          <li><strong>Próximos Días:</strong> Pedido 5, Pedido 6, Pedido 7</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
