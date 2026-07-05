"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { items, totalItems, totalPrice, increaseItem, decreaseItem, removeItem, isReady } =
    useCart();
  const [cartPulse, setCartPulse] = useState(false);

  useEffect(() => {
    if (!isReady) return;

    const frame = requestAnimationFrame(() => {
      setCartPulse(true);

      window.setTimeout(() => {
        setCartPulse(false);
      }, 350);
    });

    return () => cancelAnimationFrame(frame);
  }, [totalItems, isReady]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-black shadow-sm transition ${
          cartPulse ? "scale-110 ring-4 ring-black/10" : "scale-100"
        }`}
      >
        <span aria-hidden="true">🛒</span>
        <span>Cart ({isReady ? totalItems : 0})</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[999]">
          <button
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/25"
            aria-label="Close cart"
          />

          <aside className="absolute right-0 top-0 flex h-screen w-full max-w-[460px] flex-col bg-white p-7 text-black shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-5">
              <h2 className="text-2xl font-semibold">Cart</h2>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full border border-neutral-200 px-4 py-2 text-sm"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6">
              {!isReady ? (
                <p className="text-neutral-500">Loading cart...</p>
              ) : items.length === 0 ? (
                <p className="text-neutral-500">Your cart is empty.</p>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.slug}
                      className="flex gap-4 rounded-2xl border border-neutral-200 bg-white p-4"
                    >
                      <div className="relative h-24 w-20 shrink-0 rounded-xl bg-neutral-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-contain p-2"
                        />
                      </div>

                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-4">
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-neutral-500">{item.size}</p>
                          </div>
                          <p className="font-semibold">${item.price * item.quantity}</p>
                        </div>

                        <div className="mt-auto flex items-center justify-between pt-4">
                          <div className="flex items-center rounded-full border border-neutral-200">
                            <button onClick={() => decreaseItem(item.slug)} className="px-3 py-1">
                              −
                            </button>
                            <span className="px-3 py-1">{item.quantity}</span>
                            <button
                              onClick={() => increaseItem(item.slug)}
                              disabled={item.quantity >= item.stock}
                              className="px-3 py-1 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.slug)}
                            className="text-sm text-neutral-500 underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-neutral-200 bg-white pt-5">
              <div className="flex justify-between text-xl font-semibold">
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>

              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className="mt-5 block w-full rounded-full bg-black px-6 py-4 text-center font-semibold text-white"
              >
                Checkout
              </Link>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
