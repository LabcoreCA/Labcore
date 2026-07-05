"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        requestedProduct: formData.get("requestedProduct"),
        message: formData.get("message"),
      }),
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    form.reset();
    setStatus("sent");
  }

  return (
    <main className="min-h-screen bg-[#fafafa] px-10 py-20 text-black">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">Contact</p>

        <div className="mt-6 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h1 className="text-6xl font-semibold tracking-[-0.06em]">Get in touch.</h1>

            <p className="mt-6 max-w-xl text-xl leading-9 text-neutral-600">
              Questions about an order, product availability, or a specific research chemical request? Send us a message and our team will get back to you.
            </p>

            <div className="mt-12 grid gap-4">
              <div className="rounded-[2rem] border border-neutral-200 bg-white p-6">
                <h2 className="text-xl font-semibold">Research use only</h2>
                <p className="mt-3 leading-7 text-neutral-500">
                  All products are intended strictly for qualified laboratory research and are not for human or veterinary use.
                </p>
              </div>

              <div className="rounded-[2rem] border border-neutral-200 bg-white p-6">
                <h2 className="text-xl font-semibold">Product requests</h2>
                <p className="mt-3 leading-7 text-neutral-500">
                  Looking for a research chemical not currently listed? Tell us what you are looking for. Product demand helps guide future inventory decisions.
                </p>
              </div>

              <div className="rounded-[2rem] border border-neutral-200 bg-white p-6">
                <h2 className="text-xl font-semibold">Fast support</h2>
                <p className="mt-3 leading-7 text-neutral-500">
                  For order-related questions, include your order number when possible.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-[3rem] border border-neutral-200 bg-white p-8 shadow-sm">
            <p className="mb-8 text-sm text-neutral-500">* Required fields</p>

            <div className="grid gap-5 md:grid-cols-2">
              <input name="firstName" placeholder="First Name *" className="rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 outline-none transition focus:border-neutral-950 focus:bg-white" />
              <input name="lastName" placeholder="Last Name *" className="rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 outline-none transition focus:border-neutral-950 focus:bg-white" />
            </div>

            <input name="email" type="email" placeholder="Email *" className="mt-5 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 outline-none transition focus:border-neutral-950 focus:bg-white" />

            <select name="subject" defaultValue="" className="mt-5 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 outline-none transition focus:border-neutral-950 focus:bg-white">
              <option value="" disabled>Subject *</option>
              <option>General inquiry</option>
              <option>Order support</option>
              <option>Product request</option>
              <option>Bulk inquiry</option>
            </select>

            <input name="requestedProduct" placeholder="Requested product, if applicable" className="mt-5 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 outline-none transition focus:border-neutral-950 focus:bg-white" />

            <textarea name="message" placeholder="Comment or Message *" className="mt-5 min-h-48 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 outline-none transition focus:border-neutral-950 focus:bg-white" />

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-6 w-full rounded-full bg-black px-8 py-5 font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Submit message"}
            </button>

            {status === "sent" && (
              <p className="mt-5 rounded-2xl bg-green-50 px-5 py-4 text-sm font-semibold text-green-700">
                Message sent. We will get back to you soon.
              </p>
            )}

            {status === "error" && (
              <p className="mt-5 rounded-2xl bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
                Something went wrong. Please try again.
              </p>
            )}

            <p className="mt-5 text-sm leading-6 text-neutral-500">
              By submitting this form, you confirm your inquiry relates to laboratory research purposes only.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
