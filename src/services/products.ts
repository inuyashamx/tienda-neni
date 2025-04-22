import { Product, ProductFormData } from '../types/product';

const PRODUCTS_KEY = 'store_products';

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function getProducts(storeId: string): Product[] {
  const productsStr = localStorage.getItem(PRODUCTS_KEY);
  const allProducts: Product[] = productsStr ? JSON.parse(productsStr) : [];
  return allProducts.filter(product => product.storeId === storeId);
}

export function addProduct(storeId: string, productData: ProductFormData): Product {
  const products = getAllProducts();
  const now = new Date().toISOString();
  
  const newProduct: Product = {
    ...productData,
    id: generateId(),
    storeId,
    createdAt: now,
    updatedAt: now
  };

  products.push(newProduct);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  
  return newProduct;
}

export function updateProduct(productId: string, productData: Partial<ProductFormData>): Product {
  const products = getAllProducts();
  const index = products.findIndex(p => p.id === productId);
  
  if (index === -1) {
    throw new Error('Producto no encontrado');
  }

  const updatedProduct: Product = {
    ...products[index],
    ...productData,
    updatedAt: new Date().toISOString()
  };

  products[index] = updatedProduct;
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));

  return updatedProduct;
}

export function deleteProduct(productId: string): void {
  const products = getAllProducts();
  const filteredProducts = products.filter(p => p.id !== productId);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filteredProducts));
}

function getAllProducts(): Product[] {
  const productsStr = localStorage.getItem(PRODUCTS_KEY);
  return productsStr ? JSON.parse(productsStr) : [];
}
