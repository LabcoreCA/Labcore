import Image from "next/image";
import Link from "next/link";
import AdminTabs from "@/components/AdminTabs";
import { getAllProducts } from "@/lib/products";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <main className="min-h-screen bg-[#fafafa] px-10 py-16 text-black">
      <div className="mx-auto max-w-7xl">
        <AdminTabs />

        <div className="mt-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">
              Admin
            </p>
            <h1 className="mt-4 text-6xl font-semibold tracking-[-0.06em]">
              Products
            </h1>
          </div>

          <div className="flex gap-3">
            <Link href="/admin/products/new" className="rounded-full bg-black px-6 py-3 font-semibold text-white">
              New product
            </Link>

            <Link href="/admin" className="rounded-full border border-neutral-300 bg-white px-6 py-3 font-semibold">
              Back to dashboard
            </Link>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-neutral-200 bg-white">
          <div className="grid grid-cols-[90px_1.4fr_1fr_1fr_1fr_1fr] border-b border-neutral-200 px-6 py-4 text-sm font-semibold text-neutral-500">
            <div>Image</div>
            <div>Product</div>
            <div>SKU</div>
            <div>Price</div>
            <div>Stock</div>
            <div>Status</div>
          </div>

          {products.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-[90px_1.4fr_1fr_1fr_1fr_1fr] items-center border-b border-neutral-100 px-6 py-5 last:border-b-0"
            >
              <div className="relative h-16 w-12 rounded-xl bg-neutral-100">
                <Image src={product.image} alt={product.name} fill className="object-contain p-1" />
              </div>

              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-neutral-500">{product.size} • {product.batch}</p>
              </div>

              <div className="text-neutral-600">{product.sku}</div>
              <div className="font-semibold">${product.price} {product.currency}</div>
              <div>{product.stock}</div>

              <div className="flex items-center gap-2">
                <span className="rounded-full border border-neutral-200 px-4 py-2 text-sm capitalize">
                  {product.status}
                </span>

                <Link
                  href={`/admin/products/${product.slug}/edit`}
                  className="rounded-full border border-neutral-200 px-3 py-2 text-sm hover:bg-neutral-100"
                >
                  ✏️
                </Link>

                <form action={async () => {
                  "use server";

                  await import("@/lib/supabase").then(async ({ supabase }) => {
                    await supabase
                      .from("products")
                      .delete()
                      .eq("id", product.id);
                  });
                }}>
                  <button
                    className="rounded-full border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    type="submit"
                  >
                    🗑
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
