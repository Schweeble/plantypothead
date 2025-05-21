export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
  priceId: string; // Added for Stripe integration
}
export interface Cart {
  items: CartItem[];
  subtotal: number;
}
