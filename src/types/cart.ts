import { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  storeId: string;
}

export interface CartState {
  carts: { [storeId: string]: Cart };
  loading: boolean;
  error: string | null;
}
