import Link from "next/link";

export default function ShippingPage() {
  const sections = [
    {
      title: "Canada Only",
      body: "LabCore currently ships within Canada only. Orders placed outside Canada may be refused or cancelled."
    },
    {
      title: "Processing Time",
      body: "Orders are processed after payment has been received and verified. Processing times may vary depending on order volume and inventory availability."
    },
    {
      title: "Shipping Methods",
      body: "Available shipping options may vary by location. Estimated delivery times are provided for convenience and are not guaranteed."
    },
    {
      title: "Customer Responsibility",
      body: "Customers are responsible for providing accurate shipping information. LabCore is not responsible for delays or failed deliveries caused by incorrect addresses."
    },
    {
      title: "Lost or Delayed Shipments",
      body: "If a shipment is delayed or appears lost, please contact us with your order number so we can review the situation."
    }
  ];

  return (
    <main className="min-h-screen bg-[#fafafa] px-10 py-20 text-black">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm font-semibold text-neutral-500 transition hover:text-black">
          ← Back to Home
        </Link>

        <p className="mt-12 text-sm uppercase tracking-[0.4em] text-neutral-500">
          Information
        </p>

        <h1 className="mt-4 text-6xl font-semibold tracking-[-0.06em]">
          Shipping Policy
        </h1>

        <p className="mt-8 max-w-3xl text-xl leading-9 text-neutral-600">
          This Shipping Policy explains how LabCore processes and ships orders within Canada.
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
