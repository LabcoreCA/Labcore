"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "../types/product";

type CartItem = Product & { quantity: number };

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (slug: string) => void;
  increaseItem: (slug: string) => void;
  decreaseItem: (slug: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isReady: boolean;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const storedCart = window.localStorage.getItem("labcore-cart");
        setItems(storedCart ? JSON.parse(storedCart) : []);
      } catch {
        setItems([]);
      } finally {
        setIsReady(true);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    window.localStorage.setItem("labcore-cart", JSON.stringify(items));
  }, [items, isReady]);

  function addItem(product: Product, quantity = 1) {
    const safeQuantity = Math.max(1, quantity);

    setItems((current) => {
      const existing = current.find((item) => item.slug === product.slug);
      if (existing) {
        return current.map((item) =>
          item.slug === product.slug
            ? { ...item, quantity: Math.min(item.quantity + safeQuantity, product.stock) }
            : item
        );
      }

      return [...current, { ...product, quantity: Math.min(safeQuantity, product.stock) }];
    });
  }

  function removeItem(slug: string) {
    setItems((current) => current.filter((item) => item.slug !== slug));
  }

  function increaseItem(slug: string) {
    setItems((current) =>
      current.map((item) =>
        item.slug === slug
          ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
          : item
      )
    );
  }

  function decreaseItem(slug: string) {
    setItems((current) =>
      current
        .map((item) =>
          item.slug === slug ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function clearCart() {
    setItems([]);
  }

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const totalPrice = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, increaseItem, decreaseItem, clearCart, totalItems, totalPrice, isReady }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
