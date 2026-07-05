import Link from "next/link";

export default function ReturnsPage() {
  const sections = [
    {
      title: "Research Materials",
      body: "Due to the nature of laboratory research materials, returns may be limited once an order has been processed, shipped, opened, or handled."
    },
    {
      title: "Order Issues",
      body: "If there is an issue with your order, contact LabCore as soon as possible with your order number and a clear description of the issue."
    },
    {
      title: "Damaged or Incorrect Items",
      body: "Claims for damaged or incorrect items must be submitted promptly after delivery. LabCore may request photos or additional information before reviewing a resolution."
    },
    {
      title: "Cancellations",
      body: "Orders may be cancelled before processing whenever possible. Once an order has been processed or shipped, cancellation may no longer be available."
    },
    {
      title: "Refund Review",
      body: "Refunds, replacements, or credits are reviewed on a case-by-case basis and remain at LabCore’s discretion."
    }
  ];

  return (
    <main className="min-h-screen bg-[#fafafa] px-10 py-20 text-black">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm font-semibold text-neutral-500 transition hover:text-black">← Back to Home</Link>
        <p className="mt-12 text-sm uppercase tracking-[0.4em] text-neutral-500">Legal</p>
        <h1 className="mt-4 text-6xl font-semibold tracking-[-0.06em]">Returns & Refunds</h1>
        <p className="mt-8 max-w-3xl text-xl leading-9 text-neutral-600">
          This policy explains how LabCore reviews returns, cancellations, damaged items, and refund requests.
        </p>

        <div className="mt-16 space-y-6">
          {sections.map((section) => (
            <section key={section.title} className="rounded-[2rem] border border-neutral-200 bg-white p-8">
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <p className="mt-5 leading-8 text-neutral-600">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
