"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "../types/product";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const isOutOfStock = product.stock <= 0;

  function handleQuickAdd() {
    if (isOutOfStock) return;

    addItem(product);
    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1000);
  }

  return (
    <div className="group overflow-hidden rounded-[2rem] border border-neutral-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative mb-8 flex h-[360px] items-center justify-center overflow-hidden rounded-[1.5rem] bg-[#f7f7f7]">
          <div className="absolute h-64 w-64 rounded-full bg-white blur-2xl" />

          <Image
            src={product.image}
            alt={product.name}
            width={360}
            height={520}
            className="relative z-10 h-[340px] w-auto object-contain mix-blend-multiply transition duration-500 group-hover:scale-105"
          />

          <div className="absolute bottom-8 h-10 w-44 rounded-full bg-black/10 blur-2xl" />
        </div>

        <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">
          Research Chemical
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em]">
          {product.name}
        </h2>

        <p className="mt-4 min-h-[56px] leading-7 text-neutral-600">
          {product.description}
        </p>
      </Link>

      <div className="mt-8 flex items-center justify-between gap-4">
        <span className="text-2xl font-semibold">${product.price}</span>

        <button
          type="button"
          onClick={handleQuickAdd}
          disabled={isOutOfStock}
          className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500 disabled:hover:scale-100"
        >
          {isOutOfStock ? "Out of stock" : added ? "Added ✓" : "Quick add"}
        </button>
      </div>
    </div>
  );
}
