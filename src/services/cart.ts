import { Cart, CartItem } from '../types/cart';
import { Product } from '../types/product';

const CART_KEY = 'store_carts';

export function getCart(storeId: string): Cart {
  const cartsStr = localStorage.getItem(CART_KEY);
  const carts = cartsStr ? JSON.parse(cartsStr) : {};
  return carts[storeId] || { items: [], storeId };
}

export function addToCart(storeId: string, product: Product, quantity: number = 1): Cart {
  const carts = getAllCarts();
  const cart = carts[storeId] || { items: [], storeId };
  
  const existingItem = cart.items.find(item => item.product.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product, quantity });
  }
  
  carts[storeId] = cart;
  localStorage.setItem(CART_KEY, JSON.stringify(carts));
  
  return cart;
}

export function updateCartItemQuantity(storeId: string, productId: string, quantity: number): Cart {
  const carts = getAllCarts();
  const cart = carts[storeId];
  
  if (!cart) throw new Error('Carrito no encontrado');
  
  const item = cart.items.find(item => item.product.id === productId);
  
  if (!item) throw new Error('Producto no encontrado en el carrito');
  
  if (quantity <= 0) {
    cart.items = cart.items.filter(item => item.product.id !== productId);
  } else {
    item.quantity = quantity;
  }
  
  carts[storeId] = cart;
  localStorage.setItem(CART_KEY, JSON.stringify(carts));
  
  return cart;
}

export function removeFromCart(storeId: string, productId: string): Cart {
  return updateCartItemQuantity(storeId, productId, 0);
}

export function clearCart(storeId: string): Cart {
  const carts = getAllCarts();
  carts[storeId] = { items: [], storeId };
  localStorage.setItem(CART_KEY, JSON.stringify(carts));
  return carts[storeId];
}

function getAllCarts(): { [storeId: string]: Cart } {
  const cartsStr = localStorage.getItem(CART_KEY);
  return cartsStr ? JSON.parse(cartsStr) : {};
}

export function getCartTotal(cart: Cart): number {
  return cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
}
