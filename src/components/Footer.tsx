import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-neutral-200 bg-[#fafafa]">
      <div className="mx-auto grid max-w-7xl gap-12 px-10 py-16 md:grid-cols-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-[0.25em]">
            LABCORE
          </h2>

          <p className="mt-6 leading-7 text-neutral-500">
            Premium research chemicals for laboratory research.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Company</h3>

          <div className="mt-5 space-y-3 text-neutral-500">
            <Link href="/contact" className="block hover:text-black">
              Contact
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Information</h3>

          <div className="mt-5 space-y-3 text-neutral-500">
            <Link href="/shipping" className="block hover:text-black">
              Shipping Policy
            </Link>

            <Link href="/faq" className="block hover:text-black">
              FAQ
            </Link>

            <Link href="/research-use" className="block hover:text-black">
              Research Use Only
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Legal</h3>

          <div className="mt-5 space-y-3 text-neutral-500">
            <Link href="/privacy" className="block hover:text-black">
              Privacy Policy
            </Link>

            <Link href="/terms" className="block hover:text-black">
              Terms & Conditions
            </Link>

            <Link href="/returns" className="block hover:text-black">
              Returns & Refunds
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-200 py-8 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} LabCore. Research Use Only.
      </div>
    </footer>
  );
}
