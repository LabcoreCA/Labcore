import Link from "next/link";

export default function TermsPage() {
  const sections = [
    {
      title: "Research Use Only",
      body: "All products sold by LabCore are intended strictly for laboratory research purposes. Products are not intended for human consumption, veterinary use, therapeutic use, or diagnostic applications."
    },
    {
      title: "Eligibility",
      body: "By placing an order, you confirm that you are at least 18 years of age and legally permitted to purchase research chemicals within your jurisdiction."
    },
    {
      title: "Orders",
      body: "LabCore reserves the right to refuse, cancel or limit any order at its sole discretion. Orders may be cancelled in cases of suspected fraud, inaccurate information or inventory discrepancies."
    },
    {
      title: "Product Information",
      body: "Product descriptions are provided for identification purposes only and should never be interpreted as medical claims, dosage recommendations or instructions for human use."
    },
    {
      title: "Limitation of Liability",
      body: "LabCore shall not be liable for any direct, indirect, incidental or consequential damages arising from the purchase, handling or misuse of any product."
    },
    {
      title: "Changes",
      body: "These Terms & Conditions may be updated periodically without prior notice. Continued use of the website constitutes acceptance of any revisions."
    }
  ];

  return (
    <main className="min-h-screen bg-[#fafafa] px-10 py-20 text-black">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="text-sm font-semibold text-neutral-500 transition hover:text-black"
        >
          ← Back to Home
        </Link>

        <p className="mt-12 text-sm uppercase tracking-[0.4em] text-neutral-500">
          Legal
        </p>

        <h1 className="mt-4 text-6xl font-semibold tracking-[-0.06em]">
          Terms & Conditions
        </h1>

        <p className="mt-8 max-w-3xl text-xl leading-9 text-neutral-600">
          These Terms & Conditions govern the use of the LabCore website and the
          purchase of all products offered through our platform.
        </p>

        <div className="mt-16 space-y-6">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-[2rem] border border-neutral-200 bg-white p-8"
            >
              <h2 className="text-2xl font-semibold">
                {section.title}
              </h2>

              <p className="mt-5 leading-8 text-neutral-600">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-16 rounded-[2rem] border border-neutral-200 bg-white p-8">
          <p className="font-semibold">
            Questions regarding these Terms?
          </p>

          <p className="mt-3 text-neutral-600">
            Please visit our{" "}
            <Link href="/contact" className="font-semibold underline">
              Contact page
            </Link>{" "}
            and our team will be happy to assist you.
          </p>
        </div>
      </div>
    </main>
  );
}
