import ProductCatalog from "@/components/ProductCatalog";
import { getProducts } from "@/lib/products";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-[#fafafa] px-10 py-20 text-black">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-neutral-500">
          Catalog
        </p>

        <h1 className="text-6xl font-semibold tracking-[-0.06em]">
          Research compounds.
        </h1>

        <ProductCatalog products={products} />
      </div>
    </main>
  );
}
