import Link from "next/link";

export default function ResearchUsePage() {
  const sections = [
    {
      title: "Research Use Only",
      body: "Products offered by LabCore are intended strictly for qualified laboratory research purposes only."
    },
    {
      title: "Not for Consumption",
      body: "Products are not intended for human consumption, veterinary use, therapeutic use, diagnostic use, cosmetic use, food use, or household use."
    },
    {
      title: "No Medical Claims",
      body: "LabCore does not provide medical advice, dosage guidance, treatment recommendations, protocols, or claims related to health outcomes."
    },
    {
      title: "Buyer Responsibility",
      body: "The buyer is responsible for ensuring that products are handled, stored, and used only in appropriate research settings and in accordance with all applicable laws and regulations."
    },
    {
      title: "Qualified Handling",
      body: "Products should only be handled by individuals with appropriate knowledge, training, facilities, and safety procedures for laboratory research materials."
    }
  ];

  return (
    <main className="min-h-screen bg-[#fafafa] px-10 py-20 text-black">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm font-semibold text-neutral-500 transition hover:text-black">← Back to Home</Link>
        <p className="mt-12 text-sm uppercase tracking-[0.4em] text-neutral-500">Information</p>
        <h1 className="mt-4 text-6xl font-semibold tracking-[-0.06em]">Research Use Only</h1>
        <p className="mt-8 max-w-3xl text-xl leading-9 text-neutral-600">
          LabCore is a research chemical supplier. Products are provided strictly for laboratory research purposes.
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
