import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#fafafa]">
      <div className="mx-auto grid min-h-[820px] max-w-[1500px] grid-cols-1 items-center gap-16 px-16 py-20 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="mb-8 text-xl uppercase tracking-[0.45em] text-neutral-500">
            LABCORE
          </p>

          <h1 className="max-w-3xl text-[88px] font-semibold leading-[0.95] tracking-[-0.075em] text-black">
            Research chemicals for modern laboratories.
          </h1>

          <p className="mt-10 max-w-2xl text-2xl leading-10 text-neutral-600">
            Minimal, transparent, and precise. A clean catalog built for qualified
            laboratory research and batch-level confidence.
          </p>

          <div className="mt-12">
            <Link
              href="/products"
              className="inline-flex rounded-full bg-black px-12 py-5 text-xl font-semibold text-white shadow-2xl shadow-black/15 transition hover:scale-[1.02]"
            >
              Browse Catalog →
            </Link>
          </div>

          <div className="mt-12 flex gap-5">
            <span className="rounded-full border border-neutral-200 bg-white px-7 py-4 text-lg shadow-sm">
              ◇ COA available
            </span>
            <span className="rounded-full border border-neutral-200 bg-white px-7 py-4 text-lg shadow-sm">
              ○ Batch tested
            </span>
            <span className="rounded-full border border-neutral-200 bg-white px-7 py-4 text-lg shadow-sm">
              △ RUO only
            </span>
          </div>
        </div>

        <div className="relative flex min-h-[720px] items-center justify-center">
          <div className="absolute h-[650px] w-[650px] rounded-full bg-white shadow-[0_60px_180px_rgba(0,0,0,0.08)]" />
          <div className="absolute h-[560px] w-[560px] rounded-full border border-white/90" />
          <div className="absolute bottom-16 h-28 w-[420px] rounded-full bg-black/10 blur-3xl" />

          <div className="relative animate-[float_6s_ease-in-out_infinite]">
            <Image
              src="/vial-transparent.png"
              alt="LabCore BPC-157 vial"
              width={560}
              height={760}
              priority
              className="mix-blend-multiply contrast-[1.04] drop-shadow-[0_50px_70px_rgba(0,0,0,0.22)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
