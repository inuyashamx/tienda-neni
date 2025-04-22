export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  stock: number;
  category: string;
  status: 'active' | 'draft' | 'inactive';
  comparePrice?: number;
  sales?: number;
  createdAt: Date;
  updatedAt: Date;
  storeId: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  stock: number;
}

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}
