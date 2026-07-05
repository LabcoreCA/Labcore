import Link from "next/link";

export default function FAQPage() {
  const faqs = [
    {
      question: "What are LabCore products intended for?",
      answer: "LabCore products are intended strictly for qualified laboratory research use only. They are not intended for human or veterinary consumption."
    },
    {
      question: "Do you ship outside Canada?",
      answer: "No. LabCore currently ships within Canada only."
    },
    {
      question: "Are Certificates of Analysis available?",
      answer: "Certificates of Analysis may be available upon request. Contact LabCore with the product name and any relevant order details."
    },
    {
      question: "Can I request a product that is not listed?",
      answer: "Yes. If a research chemical is not currently listed, you may submit a request through the Contact page. Customer demand helps guide future catalog decisions."
    },
    {
      question: "When will my order be processed?",
      answer: "Orders are processed after payment has been received and verified. Processing times may vary based on order volume and inventory availability."
    },
    {
      question: "Can LabCore provide usage guidance?",
      answer: "No. LabCore does not provide usage instructions, dosage recommendations, protocols, medical advice, or therapeutic guidance."
    }
  ];

  return (
    <main className="min-h-screen bg-[#fafafa] px-10 py-20 text-black">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm font-semibold text-neutral-500 transition hover:text-black">← Back to Home</Link>
        <p className="mt-12 text-sm uppercase tracking-[0.4em] text-neutral-500">Information</p>
        <h1 className="mt-4 text-6xl font-semibold tracking-[-0.06em]">FAQ</h1>
        <p className="mt-8 max-w-3xl text-xl leading-9 text-neutral-600">
          Answers to common questions about LabCore, ordering, shipping, and research-use requirements.
        </p>

        <div className="mt-16 space-y-6">
          {faqs.map((faq) => (
            <section key={faq.question} className="rounded-[2rem] border border-neutral-200 bg-white p-8">
              <h2 className="text-2xl font-semibold">{faq.question}</h2>
              <p className="mt-5 leading-8 text-neutral-600">{faq.answer}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
