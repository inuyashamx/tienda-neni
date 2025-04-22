import React from 'react';
import { Cart } from '../types/cart';
import { getCartTotal, updateCartItemQuantity, removeFromCart } from '../services/cart';

interface CartDrawerProps {
  cart: Cart;
  isOpen: boolean;
  onClose: () => void;
  onUpdateCart: (cart: Cart) => void;
}

export default function CartDrawer({ cart, isOpen, onClose, onUpdateCart }: CartDrawerProps) {
  const handleQuantityChange = (productId: string, quantity: number) => {
    try {
      const updatedCart = updateCartItemQuantity(cart.storeId, productId, quantity);
      onUpdateCart(updatedCart);
    } catch (error) {
      console.error('Error al actualizar cantidad:', error);
    }
  };

  const handleRemoveItem = (productId: string) => {
    try {
      const updatedCart = removeFromCart(cart.storeId, productId);
      onUpdateCart(updatedCart);
    } catch (error) {
      console.error('Error al eliminar item:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 overflow-hidden z-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="pointer-events-auto w-screen max-w-md">
            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-6 sm:px-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Carrito de compras</h2>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500"
                  onClick={onClose}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                {cart.items.length === 0 ? (
                  <div className="text-center py-12">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Tu carrito está vacío</h3>
                    <p className="mt-1 text-sm text-gray-500">¡Comienza a agregar productos!</p>
                  </div>
                ) : (
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {cart.items.map((item) => (
                        <li key={item.product.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            {item.product.imageUrl ? (
                              <img
                                src={item.product.imageUrl}
                                alt={item.product.name}
                                className="h-full w-full object-cover object-center"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center bg-gray-100">
                                <svg
                                  className="h-8 w-8 text-gray-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>{item.product.name}</h3>
                                <p className="ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500 line-clamp-1">{item.product.description}</p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="flex items-center border rounded-lg">
                                <button
                                  onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                                  className="px-3 py-1 text-gray-600 hover:text-gray-700"
                                >
                                  -
                                </button>
                                <span className="px-3 py-1 border-x">{item.quantity}</span>
                                <button
                                  onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                                  className="px-3 py-1 text-gray-600 hover:text-gray-700"
                                >
                                  +
                                </button>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveItem(item.product.id)}
                                className="font-medium text-red-600 hover:text-red-500"
                              >
                                Eliminar
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${getCartTotal(cart).toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">Envío calculado al finalizar la compra.</p>
                <div className="mt-6">
                  <button
                    onClick={() => alert('Próximamente: Proceso de pago')}
                    className="w-full flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={cart.items.length === 0}
                  >
                    Finalizar Compra
                  </button>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <button
                    type="button"
                    className="font-medium text-blue-600 hover:text-blue-500"
                    onClick={onClose}
                  >
                    Seguir Comprando
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
