"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Order, OrderCustomer, PaymentMethod } from "../types/order";
import type { Product } from "../types/product";

type CartItem = Product & { quantity: number };

type OrderContextType = {
  orders: Order[];
  createOrder: (input: {
    items: CartItem[];
    paymentMethod: PaymentMethod;
    customer: OrderCustomer;
  }) => Order;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  getOrder: (orderNumber: string) => Order | undefined;
};

const OrderContext = createContext<OrderContextType | null>(null);

function getStoredOrders(): Order[] {
  if (typeof window === "undefined") return [];

  try {
    const storedOrders = window.localStorage.getItem("labcore-orders");
    return storedOrders ? JSON.parse(storedOrders) : [];
  } catch {
    return [];
  }
}

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(getStoredOrders);

  useEffect(() => {
    window.localStorage.setItem("labcore-orders", JSON.stringify(orders));
  }, [orders]);

  const createOrder = useCallback((input: {
    items: CartItem[];
    paymentMethod: PaymentMethod;
    customer: OrderCustomer;
  }) => {
    const subtotal = input.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const shipping = 0;
    const total = subtotal + shipping;

    const order: Order = {
      id: crypto.randomUUID(),
      number: `LC-${Date.now().toString().slice(-6)}`,
      status: "awaiting_payment",
      paymentMethod: input.paymentMethod,
      items: input.items,
      subtotal,
      shipping,
      total,
      customer: input.customer,
      createdAt: new Date().toISOString(),
    };

    setOrders((current) => [order, ...current]);

    return order;
  }, []);

  const updateOrderStatus = useCallback(
    (orderId: string, status: Order["status"]) => {
      setOrders((current) =>
        current.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    },
    []
  );

  const getOrder = useCallback(
    (orderNumber: string) => {
      return orders.find((order) => order.number === orderNumber);
    },
    [orders]
  );

  const value = useMemo(
    () => ({ orders, createOrder, updateOrderStatus, getOrder }),
    [orders, createOrder, updateOrderStatus, getOrder]
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrders() {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error("useOrders must be used inside OrderProvider");
  }

  return context;
}
