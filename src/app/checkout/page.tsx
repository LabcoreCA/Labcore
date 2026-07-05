"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import type { PaymentMethod } from "../../types/order";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("crypto");
  const [submitting, setSubmitting] = useState(false);

  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    province: "",
    postalCode: "",
  });

  async function submitOrder() {
    setSubmitting(true);

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: items.map((item) => ({
          slug: item.slug,
          quantity: item.quantity,
        })),
        customer,
        paymentMethod,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Unable to submit order.");
      setSubmitting(false);
      return;
    }

    clearCart();
    router.push(`/order-confirmation?order=${data.orderNumber}`);
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#fafafa] px-10 py-20 text-black">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-neutral-200 bg-white p-10 text-center">
          <h1 className="text-4xl font-semibold">Your cart is empty</h1>
          <Link href="/products" className="mt-8 inline-block rounded-full bg-black px-8 py-4 font-semibold text-white">
            Back to catalog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa] px-10 py-16 text-black">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_420px]">
        <section className="rounded-[2rem] border border-neutral-200 bg-white p-8">
          <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">Checkout</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">Complete your order</h1>

          <div className="mt-10 space-y-8">
            <div>
              <h2 className="text-2xl font-semibold">Contact information</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <input className="rounded-2xl border border-neutral-200 px-5 py-4" placeholder="First name" onChange={(e) => setCustomer({ ...customer, firstName: e.target.value })} />
                <input className="rounded-2xl border border-neutral-200 px-5 py-4" placeholder="Last name" onChange={(e) => setCustomer({ ...customer, lastName: e.target.value })} />
                <input className="rounded-2xl border border-neutral-200 px-5 py-4 md:col-span-2" placeholder="Email" onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
                <input className="rounded-2xl border border-neutral-200 px-5 py-4 md:col-span-2" placeholder="Phone optional" onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold">Shipping address</h2>
              <div className="mt-4 grid gap-4">
                <input className="rounded-2xl border border-neutral-200 px-5 py-4" placeholder="Address" onChange={(e) => setCustomer({ ...customer, address: e.target.value })} />
                <input className="rounded-2xl border border-neutral-200 px-5 py-4" placeholder="Apartment, suite, etc. optional" onChange={(e) => setCustomer({ ...customer, apartment: e.target.value })} />
                <div className="grid gap-4 md:grid-cols-3">
                  <input className="rounded-2xl border border-neutral-200 px-5 py-4" placeholder="City" onChange={(e) => setCustomer({ ...customer, city: e.target.value })} />
                  <input className="rounded-2xl border border-neutral-200 px-5 py-4" placeholder="Province" onChange={(e) => setCustomer({ ...customer, province: e.target.value })} />
                  <input className="rounded-2xl border border-neutral-200 px-5 py-4" placeholder="Postal code" onChange={(e) => setCustomer({ ...customer, postalCode: e.target.value })} />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold">Payment method</h2>
              <div className="mt-4 grid gap-4">
                {[
                  ["crypto", "Crypto", "Payment instructions will be sent after order submission."],
                  ["interac", "Interac e-Transfer", "Instructions will be provided after order submission."],
                  ["card", "Credit card", "Currently unavailable."],
                ].map(([value, title, subtitle]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => value !== "card" && setPaymentMethod(value as PaymentMethod)}
                    className={`rounded-2xl border p-5 text-left transition ${
                      paymentMethod === value ? "border-black bg-neutral-50" : "border-neutral-200 bg-white"
                    } ${value === "card" ? "cursor-not-allowed opacity-50" : ""}`}
                  >
                    <p className="font-semibold">{title}</p>
                    <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={submitOrder}
              disabled={submitting}
              className="block w-full rounded-full bg-black px-8 py-5 text-center text-lg font-semibold text-white disabled:opacity-50"
            >
              {submitting ? "Submitting order..." : "Submit order"}
            </button>
          </div>
        </section>

        <aside className="h-fit rounded-[2rem] border border-neutral-200 bg-white p-8">
          <h2 className="text-2xl font-semibold">Order summary</h2>

          <div className="mt-6 space-y-5">
            {items.map((item) => (
              <div key={item.slug} className="flex gap-4">
                <div className="relative h-20 w-16 rounded-xl bg-neutral-100">
                  <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-neutral-500">Qty {item.quantity}</p>
                </div>
                <p className="font-semibold">${item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-neutral-200 pt-6">
            <div className="flex justify-between text-xl font-semibold">
              <span>Total</span>
              <span>${totalPrice} CAD</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
