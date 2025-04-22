import React, { useState } from 'react';

interface StoreSettings {
  name: string;
  description: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  social: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  shipping: {
    freeShippingThreshold: number;
    baseShippingRate: number;
  };
  payment: {
    acceptedMethods: string[];
  };
}

export default function StoreSettings() {
  const [settings, setSettings] = useState<StoreSettings>({
    name: 'Mi Tienda',
    description: 'La mejor tienda de ropa',
    email: 'contacto@mitienda.com',
    phone: '555-0123',
    address: {
      street: 'Calle Principal 123',
      city: 'Ciudad',
      state: 'Estado',
      zip: '12345',
      country: 'México'
    },
    social: {
      facebook: '',
      instagram: '',
      twitter: ''
    },
    shipping: {
      freeShippingThreshold: 999,
      baseShippingRate: 99
    },
    payment: {
      acceptedMethods: ['card', 'cash']
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Guardar configuración:', settings);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Configuración de la Tienda</h1>
            <p className="mt-2 text-sm text-gray-700">
              Personaliza la configuración y apariencia de tu tienda
            </p>
          </div>

          {/* Settings Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-8">
            {/* General Settings */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Información General</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nombre de la tienda
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={settings.name}
                    onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Descripción
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={3}
                    value={settings.description}
                    onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Información de Contacto</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Settings */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Configuración de Envíos</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="freeShippingThreshold" className="block text-sm font-medium text-gray-700">
                    Monto mínimo para envío gratis
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="freeShippingThreshold"
                      id="freeShippingThreshold"
                      value={settings.shipping.freeShippingThreshold}
                      onChange={(e) => setSettings({
                        ...settings,
                        shipping: {
                          ...settings.shipping,
                          freeShippingThreshold: Number(e.target.value)
                        }
                      })}
                      className="mt-1 block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="baseShippingRate" className="block text-sm font-medium text-gray-700">
                    Tarifa base de envío
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="baseShippingRate"
                      id="baseShippingRate"
                      value={settings.shipping.baseShippingRate}
                      onChange={(e) => setSettings({
                        ...settings,
                        shipping: {
                          ...settings.shipping,
                          baseShippingRate: Number(e.target.value)
                        }
                      })}
                      className="mt-1 block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Métodos de Pago</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="card"
                    name="payment"
                    type="checkbox"
                    checked={settings.payment.acceptedMethods.includes('card')}
                    onChange={(e) => {
                      const methods = e.target.checked
                        ? [...settings.payment.acceptedMethods, 'card']
                        : settings.payment.acceptedMethods.filter(m => m !== 'card');
                      setSettings({
                        ...settings,
                        payment: { ...settings.payment, acceptedMethods: methods }
                      });
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="card" className="ml-3 block text-sm font-medium text-gray-700">
                    Tarjeta de crédito/débito
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="cash"
                    name="payment"
                    type="checkbox"
                    checked={settings.payment.acceptedMethods.includes('cash')}
                    onChange={(e) => {
                      const methods = e.target.checked
                        ? [...settings.payment.acceptedMethods, 'cash']
                        : settings.payment.acceptedMethods.filter(m => m !== 'cash');
                      setSettings({
                        ...settings,
                        payment: { ...settings.payment, acceptedMethods: methods }
                      });
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="cash" className="ml-3 block text-sm font-medium text-gray-700">
                    Efectivo
                  </label>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#2196f3] hover:bg-[#1976d2] focus:outline-none"
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
