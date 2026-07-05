import type { Product } from "./product";

export type OrderStatus =
  | "awaiting_payment"
  | "paid"
  | "processing"
  | "shipped"
  | "completed"
  | "cancelled";

export type PaymentMethod = "crypto" | "interac" | "card";

export type OrderItem = Product & {
  quantity: number;
};

export type OrderCustomer = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address: string;
  apartment?: string;
  city: string;
  province: string;
  postalCode: string;
};

export type Order = {
  id: string;
  number: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customer: OrderCustomer;
  createdAt: string;
};
