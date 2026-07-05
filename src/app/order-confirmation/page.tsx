import Link from "next/link";

export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <main className="min-h-screen bg-[#fafafa] px-10 py-20 text-black">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-neutral-200 bg-white p-10 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">
          Order submitted
        </p>

        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">
          Thank you
        </h1>

        <p className="mt-6 text-lg text-neutral-600">
          Your order has been received. Payment instructions will be sent separately.
        </p>

        <div className="mt-8 rounded-2xl bg-neutral-50 p-6 text-left">
          <p>
            <strong>Order:</strong> {order || "LC-PENDING"}
          </p>
          <p className="mt-2">
            <strong>Status:</strong> Awaiting payment
          </p>
        </div>

        <Link
          href="/products"
          className="mt-8 inline-block rounded-full bg-black px-8 py-4 font-semibold text-white"
        >
          Back to catalog
        </Link>
      </div>
    </main>
  );
}
