"use client";

import { useState } from "react";
import type { Product } from "../types/product";
import { useCart } from "../context/CartContext";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const isOutOfStock = product.stock <= 0;

  function decreaseQuantity() {
    setQuantity((current) => Math.max(1, current - 1));
  }

  function increaseQuantity() {
    setQuantity((current) => Math.min(product.stock, current + 1));
  }

  return (
    <div className="mt-10 flex max-w-xl flex-col gap-4 sm:flex-row">
      <div className="flex h-[68px] items-center justify-between rounded-full border border-neutral-200 bg-white px-3">
        <button
          type="button"
          onClick={decreaseQuantity}
          disabled={isOutOfStock || quantity <= 1}
          className="flex h-12 w-12 items-center justify-center rounded-full text-2xl transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30"
        >
          −
        </button>

        <span className="min-w-12 text-center text-lg font-semibold">{quantity}</span>

        <button
          type="button"
          onClick={increaseQuantity}
          disabled={isOutOfStock || quantity >= product.stock}
          className="flex h-12 w-12 items-center justify-center rounded-full text-2xl transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={() => {
          if (!isOutOfStock) addItem(product, quantity);
        }}
        disabled={isOutOfStock}
        className="h-[68px] flex-1 rounded-full bg-black px-8 text-lg font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500 disabled:hover:scale-100"
      >
        {isOutOfStock ? "Out of stock" : `Add ${quantity} to cart`}
      </button>
    </div>
  );
}
