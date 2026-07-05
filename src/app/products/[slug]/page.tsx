import Image from "next/image";
import AddToCartButton from "../../../components/AddToCartButton";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  return (
    <main className="min-h-screen bg-[#fafafa] px-10 py-20 text-black">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative flex min-h-[680px] items-center justify-center overflow-hidden rounded-[3rem] border border-neutral-200 bg-[#eeeeee] shadow-sm">
          <div className="absolute h-[540px] w-[540px] rounded-full bg-[#f8f8f8] shadow-[inset_0_0_140px_rgba(0,0,0,0.12)]" />
          <div className="absolute bottom-20 h-14 w-[280px] rounded-full bg-black/12 blur-2xl" />

          <Image
            src={product.image}
            alt={product.name}
            width={520}
            height={740}
            priority
            className="relative z-10 h-[620px] w-auto object-contain contrast-[1.12] brightness-[0.96] drop-shadow-[0_42px_65px_rgba(0,0,0,0.24)]"
          />
        </div>

        <div className="pt-10">
          <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">
            {product.category}
          </p>

          <h1 className="mt-5 text-7xl font-semibold tracking-[-0.07em]">
            {product.name}
          </h1>

          <p className="mt-6 text-3xl font-semibold">${product.price}</p>

          <p className="mt-8 max-w-xl text-xl leading-9 text-neutral-600">
            {product.description}
          </p>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5">
              <p className="text-xs text-neutral-500">SIZE</p>
              <p className="mt-2 font-semibold">{product.size}</p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-5">
              <p className="text-xs text-neutral-500">PURITY</p>
              <p className="mt-2 font-semibold">{product.purity}</p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-5">
              <p className="text-xs text-neutral-500">BATCH</p>
              <p className="mt-2 font-semibold">{product.batch}</p>
            </div>
          </div>

          <div className="mt-8 max-w-xl rounded-2xl border border-neutral-200 bg-white px-5 py-4">
            {product.stock <= 0 ? (
              <p className="font-semibold text-red-600">Out of stock</p>
            ) : product.stock <= 3 ? (
              <p className="font-semibold text-orange-600">Only {product.stock} left</p>
            ) : (
              <p className="font-semibold text-green-700">In stock · {product.stock} available</p>
            )}
          </div>

          <AddToCartButton product={product} />

          <div className="mt-10 max-w-xl border-t border-neutral-200 pt-8">
            <h2 className="text-2xl font-semibold">Research use only</h2>
            <p className="mt-4 leading-7 text-neutral-600">
              This product is intended for qualified laboratory research only and
              is not for human consumption, diagnostic, therapeutic, or veterinary use.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
