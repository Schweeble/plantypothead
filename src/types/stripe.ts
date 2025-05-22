export interface StripeProduct {
  id: string;
  name: string;
  description: string;
  images: string[];
  default_price: {
    id: string;
    unit_amount: number;
    currency: string;
  };
}
