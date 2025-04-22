import React, { useState } from 'react';

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
  };
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  createdAt: Date;
}

// Datos de ejemplo
const sampleOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-001',
    customer: {
      name: 'Juan Pérez',
      email: 'juan@example.com'
    },
    total: 599.98,
    status: 'pending',
    paymentStatus: 'paid',
    items: [
      {
        productId: '1',
        name: 'Camiseta Básica',
        quantity: 2,
        price: 299.99
      }
    ],
    createdAt: new Date()
  },
  {
    id: '2',
    orderNumber: 'ORD-002',
    customer: {
      name: 'Ana Gómez',
      email: 'ana@example.com'
    },
    total: 299.99,
    status: 'completed',
    paymentStatus: 'paid',
    items: [
      {
        productId: '2',
        name: 'Pantalones',
        quantity: 1,
        price: 299.99
      }
    ],
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1))
  },
  {
    id: '3',
    orderNumber: 'ORD-003',
    customer: {
      name: 'Carlos Ruiz',
      email: 'carlos@example.com'
    },
    total: 150.00,
    status: 'processing',
    paymentStatus: 'pending',
    items: [
      {
        productId: '3',
        name: 'Zapatos',
        quantity: 1,
        price: 150.00
      }
    ],
    createdAt: new Date(new Date().setDate(new Date().getDate() + 1))
  },
  {
    id: '4',
    orderNumber: 'ORD-004',
    customer: {
      name: 'María Rodríguez',
      email: 'maria@example.com'
    },
    total: 499.99,
    status: 'pending',
    paymentStatus: 'pending',
    items: [
      {
        productId: '4',
        name: 'Bolso',
        quantity: 1,
        price: 499.99
      }
    ],
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2))
  },
  {
    id: '5',
    orderNumber: 'ORD-005',
    customer: {
      name: 'Pedro García',
      email: 'pedro@example.com'
    },
    total: 99.99,
    status: 'completed',
    paymentStatus: 'paid',
    items: [
      {
        productId: '5',
        name: 'Gorra',
        quantity: 1,
        price: 99.99
      }
    ],
    createdAt: new Date(new Date().setDate(new Date().getDate() + 2))
  },
  // Más pedidos de ejemplo
];

function groupOrdersByDate(orders: Order[]) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + 2);

  return {
    Hoy: orders.filter(order => order.createdAt.toDateString() === today.toDateString()),
    Mañana: orders.filter(order => order.createdAt.toDateString() === tomorrow.toDateString()),
    'Pasado Mañana': orders.filter(order => order.createdAt.toDateString() === dayAfterTomorrow.toDateString()),
    Futuro: orders.filter(order => order.createdAt > dayAfterTomorrow)
  };
}

export default function Orders() {
  const [orders] = useState<Order[]>(sampleOrders);
  const groupedOrders = groupOrdersByDate(orders);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pedidos</h1>
          <p className="mt-2 text-sm text-gray-700">
            Gestiona los pedidos de tu tienda
          </p>
        </div>

        {/* Orders List */}
        {Object.entries(groupedOrders).map(([key, orders]) => (
          <div key={key} className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800">{key}</h2>
            <div className="bg-white shadow-sm rounded-lg mt-4">
              <ul className="divide-y divide-gray-200">
                {orders.map(order => (
                  <li key={order.id} className="px-4 py-4 flex items-center justify-between bg-blue-100 hover:bg-blue-200">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.orderNumber}</div>
                      <div className="text-sm text-gray-500">
                        {order.customer.name} - {order.customer.email}
                      </div>
                    </div>
                    <div className="text-sm text-gray-900">${order.total.toFixed(2)}</div>
                    <div className={`text-sm ${order.status === 'pending' ? 'text-yellow-500' : order.status === 'completed' ? 'text-green-500' : 'text-red-500'}`}>
                      {order.status}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
