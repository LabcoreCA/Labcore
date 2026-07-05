import { getProducts } from "@/lib/products";
import ProductGrid from "./ProductGrid";

export default async function FeaturedProducts() {
  const products = await getProducts();
  const featured = products.slice(0, 4);

  if (featured.length === 0) return null;

  return (
    <section className="bg-[#fafafa] px-10 py-24 text-black">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">
          Featured Products
        </p>

        <h2 className="mt-4 text-5xl font-semibold tracking-[-0.06em]">
          Research chemicals.
        </h2>

        <ProductGrid products={featured} />
      </div>
    </section>
  );
}
