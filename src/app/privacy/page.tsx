import Link from "next/link";

export default function PrivacyPage() {
  const sections = [
    {
      title: "Information We Collect",
      body: "LabCore may collect information you provide when placing an order, contacting us, or using our website. This may include your name, email address, shipping information, order details, and message content."
    },
    {
      title: "How Information Is Used",
      body: "Information is used to process orders, provide customer support, respond to inquiries, improve our website, and maintain accurate business records."
    },
    {
      title: "Order and Contact Records",
      body: "Order and contact information may be stored securely to support fulfillment, customer service, internal record keeping, and compliance with applicable business requirements."
    },
    {
      title: "Information Sharing",
      body: "LabCore does not sell personal information. Information may be shared only with service providers necessary to operate the website, process payments, ship orders, or comply with legal obligations."
    },
    {
      title: "Security",
      body: "LabCore takes reasonable measures to protect customer information. However, no method of electronic storage or transmission can be guaranteed to be completely secure."
    },
    {
      title: "Contact",
      body: "For privacy-related questions, please contact LabCore through the Contact page."
    }
  ];

  return (
    <main className="min-h-screen bg-[#fafafa] px-10 py-20 text-black">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm font-semibold text-neutral-500 transition hover:text-black">← Back to Home</Link>
        <p className="mt-12 text-sm uppercase tracking-[0.4em] text-neutral-500">Legal</p>
        <h1 className="mt-4 text-6xl font-semibold tracking-[-0.06em]">Privacy Policy</h1>
        <p className="mt-8 max-w-3xl text-xl leading-9 text-neutral-600">
          This Privacy Policy explains how LabCore handles information collected through our website.
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
