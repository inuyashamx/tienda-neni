import React, { useState } from 'react';
import { FaCalendarAlt, FaList } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
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
const today = new Date();
const yesterday = new Date(); yesterday.setDate(today.getDate() - 1);
const tomorrow = new Date(); tomorrow.setDate(today.getDate() + 1);
const dayAfterTomorrow = new Date(); dayAfterTomorrow.setDate(today.getDate() + 2);

const sampleOrders: Order[] = [
  // Hoy
  {
    id: '1', orderNumber: 'ORD-001', customer: { name: 'Juan Pérez', email: 'juan@example.com', phone: '555-1234' }, total: 599.98, status: 'pending', paymentStatus: 'pending',
    items: [ { productId: '1', name: 'Playera', quantity: 2, price: 299.99 } ],
    createdAt: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 15)
  },
  {
    id: '2', orderNumber: 'ORD-002', customer: { name: 'Ana Gómez', email: 'ana@example.com', phone: '555-5678' }, total: 299.99, status: 'processing', paymentStatus: 'paid',
    items: [ { productId: '2', name: 'Jeans', quantity: 1, price: 299.99 }, { productId: '3', name: 'Gorra', quantity: 1, price: 99.99 } ],
    createdAt: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 45)
  },
  {
    id: '3', orderNumber: 'ORD-003', customer: { name: 'Carlos Ruiz', email: 'carlos@example.com', phone: '555-8888' }, total: 150.00, status: 'completed', paymentStatus: 'paid',
    items: [ { productId: '4', name: 'Sudadera', quantity: 1, price: 150.00 } ],
    createdAt: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 30)
  },
  // Ayer
  {
    id: '4', orderNumber: 'ORD-004', customer: { name: 'María Rodríguez', email: 'maria@example.com', phone: '555-4321' }, total: 499.99, status: 'pending', paymentStatus: 'pending',
    items: [ { productId: '5', name: 'Tenis', quantity: 1, price: 499.99 } ],
    createdAt: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 11, 10)
  },
  {
    id: '5', orderNumber: 'ORD-005', customer: { name: 'Pedro García', email: 'pedro@example.com', phone: '555-0000' }, total: 99.99, status: 'completed', paymentStatus: 'paid',
    items: [ { productId: '6', name: 'Lentes', quantity: 1, price: 99.99 } ],
    createdAt: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 13, 0)
  },
  {
    id: '6', orderNumber: 'ORD-006', customer: { name: 'Luis López', email: 'luis@example.com', phone: '555-1111' }, total: 220.00, status: 'processing', paymentStatus: 'pending',
    items: [ { productId: '7', name: 'Reloj', quantity: 1, price: 220.00 } ],
    createdAt: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 16, 20)
  },
  // Mañana
  {
    id: '7', orderNumber: 'ORD-007', customer: { name: 'Sofía Torres', email: 'sofia@example.com', phone: '555-2222' }, total: 340.00, status: 'pending', paymentStatus: 'pending',
    items: [ { productId: '8', name: 'Cartera', quantity: 1, price: 340.00 } ],
    createdAt: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 9, 50)
  },
  {
    id: '8', orderNumber: 'ORD-008', customer: { name: 'Miguel Ángel', email: 'miguel@example.com', phone: '555-3333' }, total: 180.00, status: 'cancelled', paymentStatus: 'pending',
    items: [ { productId: '9', name: 'Shorts', quantity: 2, price: 90.00 } ],
    createdAt: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 13, 15)
  },
  {
    id: '9', orderNumber: 'ORD-009', customer: { name: 'Laura Méndez', email: 'laura@example.com', phone: '555-4444' }, total: 510.00, status: 'processing', paymentStatus: 'paid',
    items: [ { productId: '10', name: 'Chamarra', quantity: 1, price: 510.00 } ],
    createdAt: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 17, 40)
  },
  // Pasado mañana
  {
    id: '10', orderNumber: 'ORD-010', customer: { name: 'Ricardo Díaz', email: 'ricardo@example.com', phone: '555-5555' }, total: 120.00, status: 'pending', paymentStatus: 'pending',
    items: [ { productId: '11', name: 'Sandalias', quantity: 2, price: 60.00 } ],
    createdAt: new Date(dayAfterTomorrow.getFullYear(), dayAfterTomorrow.getMonth(), dayAfterTomorrow.getDate(), 8, 30)
  },
  {
    id: '11', orderNumber: 'ORD-011', customer: { name: 'Patricia Solís', email: 'patricia@example.com', phone: '555-6666' }, total: 75.00, status: 'completed', paymentStatus: 'paid',
    items: [ { productId: '12', name: 'Sudadera', quantity: 1, price: 75.00 } ],
    createdAt: new Date(dayAfterTomorrow.getFullYear(), dayAfterTomorrow.getMonth(), dayAfterTomorrow.getDate(), 12, 0)
  },
  {
    id: '12', orderNumber: 'ORD-012', customer: { name: 'Gabriela Fernández', email: 'gabriela@example.com', phone: '555-7777' }, total: 260.00, status: 'cancelled', paymentStatus: 'pending',
    items: [ { productId: '13', name: 'Mochila', quantity: 2, price: 130.00 } ],
    createdAt: new Date(dayAfterTomorrow.getFullYear(), dayAfterTomorrow.getMonth(), dayAfterTomorrow.getDate(), 18, 10)
  },
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
  const [searchTerm, setSearchTerm] = useState('');
  const [calendarMode, setCalendarMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const groupedOrders = groupOrdersByDate(orders);

  const filteredOrders = (orders: Order[]) => {
    return orders.filter(order =>
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="px-1 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center space-x-4">
          <input
            type="text"
            placeholder="Buscar pedidos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-2 block w-full max-w-xs rounded-md border border-[#673ab7] bg-white py-2 px-4 text-sm text-gray-700 placeholder-gray-400 focus:border-[#673ab7] focus:ring-2 focus:ring-[#673ab7]"
          />
          <button
            type="button"
            onClick={() => setCalendarMode((v) => !v)}
            className="ml-2 mt-2 p-2 rounded-full bg-white border border-[#673ab7] text-[#673ab7] hover:bg-[#ede7f6] shadow"
            title={calendarMode ? 'Ver lista' : 'Ver calendario'}
          >
            {calendarMode ? <FaList size={20} /> : <FaCalendarAlt size={20} />}
          </button>
        </div>

        {/* Orders Calendar/List */}
        {calendarMode && (
          <div className="p-3 w-full max-w-md mx-auto mb-6">
            <Calendar
              value={selectedDate}
              onClickDay={date => setSelectedDate(date)}
              tileContent={({ date, view }) => {
                if (view !== 'month') return null;
                // Agrupar pedidos de ese día por status
                const pedidosDia = orders.filter(order =>
                  order.createdAt.getFullYear() === date.getFullYear() &&
                  order.createdAt.getMonth() === date.getMonth() &&
                  order.createdAt.getDate() === date.getDate()
                );
                if (!pedidosDia.length) return null;
                // Agrupar por status
                const statusColors = {
                  pending: 'bg-yellow-400',
                  processing: 'bg-[#673ab7]',
                  completed: 'bg-green-500',
                  cancelled: 'bg-red-500',
                };
                // Máximo 5 bolitas por status para no saturar
                const statusCount: Record<string, number> = {};
                pedidosDia.forEach(p => {
                  statusCount[p.status] = (statusCount[p.status] || 0) + 1;
                });
                return (
                  <div className="flex justify-center mt-1 gap-0.5">
                    {Object.entries(statusCount).map(([status, count]) =>
                      [...Array(Math.min(count, 5))].map((_, i) => (
                        <span
                          key={status + i}
                          className={`w-2 h-2 rounded-full ${statusColors[status as keyof typeof statusColors]} inline-block`}
                          style={{ marginLeft: i > 0 ? 2 : 0 }}
                        ></span>
                      ))
                    )}
                  </div>
                );
              }}
              calendarType="iso8601"
              locale="es-MX"
              tileClassName={({ date }) => {
                // Resaltar el día seleccionado
                if (
                  selectedDate &&
                  date.getFullYear() === selectedDate.getFullYear() &&
                  date.getMonth() === selectedDate.getMonth() &&
                  date.getDate() === selectedDate.getDate()
                ) {
                  return 'react-calendar__tile--active';
                }
                return '';
              }}
            />
          </div>
        )}
        {calendarMode && selectedDate && (
          <div className="w-full max-w-md mx-auto">
            {(() => {
              const pedidosDia = orders.filter(order =>
                order.createdAt.getFullYear() === selectedDate.getFullYear() &&
                order.createdAt.getMonth() === selectedDate.getMonth() &&
                order.createdAt.getDate() === selectedDate.getDate()
              );
              if (!pedidosDia.length) return <div className="text-center text-gray-400 py-8">Sin pedidos para este día.</div>;
              return (
                <div className="flex flex-col gap-4 mt-4">
                  {pedidosDia.map(order => (
                    <div key={order.id} className="relative bg-white rounded-lg shadow-md border-l-4 border-[#673ab7] px-4 py-3 flex flex-col gap-1 hover:bg-[#ede7f6] transition">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#4527a0] text-base leading-tight truncate">{order.customer.name}</span>
                        <span className="font-bold text-lg text-gray-900">${order.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-400">{order.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : order.status === 'processing' ? 'bg-[#d1c4e9] text-[#4527a0]' : order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{order.status === 'pending' ? 'Pendiente' : order.status === 'processing' ? 'Enviado' : order.status === 'completed' ? 'Completado' : 'Cancelado'}</span>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${order.paymentStatus === 'pending' ? 'bg-yellow-50 text-yellow-700' : order.paymentStatus === 'paid' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{order.paymentStatus === 'pending' ? 'Por pagar' : 'Pagado'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )}
        {!calendarMode && (
          <TimelineOrders orders={filteredOrders(orders)} />
        )}
      </div>
    </div>
  );
}

// TimelineOrders component tipo timeline Material
function TimelineOrders({ orders }: { orders: Order[] }) {
  // Agrupa pedidos por fecha
  const grouped: { [date: string]: Order[] } = {};
  for (const order of orders) {
    const key = order.createdAt.toDateString();
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(order);
  }
  // Ordena fechas ascendente
  const sortedDates = Object.keys(grouped).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  return (
    <div className="mt-8">
      <div className="flex flex-col gap-8">
        {sortedDates.map(dateKey => {
          const day = new Date(dateKey);
          // Ordena pedidos por hora
          const pedidos = grouped[dateKey].slice().sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
          return (
            <div key={dateKey} className="flex items-start gap-4">
              {/* Fecha timeline */}
              <div className="flex flex-col items-center min-w-[60px]">
                <span className="text-2xl font-bold text-[#673ab7] leading-none">{day.getDate().toString().padStart(2, '0')}</span>
                <span className="text-xs text-gray-400 uppercase">{day.toLocaleDateString(undefined, { month: 'short' })}</span>
                <span className="text-xs text-gray-400 uppercase">{day.toLocaleDateString(undefined, { weekday: 'short' })}</span>
                <span className="h-full w-1 bg-[#ede7f6] mt-2"></span>
              </div>
              {/* Pedidos del día */}
              <div className="flex-1 flex flex-col gap-4">
                {pedidos.map(order => (
                  <div key={order.id} className="relative bg-white rounded-lg shadow-md border-l-4 border-[#673ab7] px-4 py-3 flex flex-col gap-1 hover:bg-[#ede7f6] transition">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#4527a0] text-base leading-tight truncate">{order.customer.name}</span>
                      <span className="font-bold text-lg text-gray-900">${order.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-400">{order.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : order.status === 'processing' ? 'bg-[#d1c4e9] text-[#4527a0]' : order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{order.status === 'pending' ? 'Pendiente' : order.status === 'processing' ? 'Enviado' : order.status === 'completed' ? 'Completado' : 'Cancelado'}</span>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${order.paymentStatus === 'pending' ? 'bg-yellow-50 text-yellow-700' : order.paymentStatus === 'paid' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{order.paymentStatus === 'pending' ? 'Por pagar' : 'Pagado'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
