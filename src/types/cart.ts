export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
export interface Cart {
  items: CartItem[];
  subtotal: number;
}
