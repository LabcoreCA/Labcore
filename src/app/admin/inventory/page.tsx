import Image from "next/image";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { getAllProducts } from "@/lib/products";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import AdminTabs from "@/components/AdminTabs";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function updateStock(formData: FormData) {
  "use server";

  const supabase = await createSupabaseServerClient();
  const id = String(formData.get("id") || "");
  const stock = Math.max(0, Number(formData.get("stock") || 0));

  await supabase.from("products").update({ stock }).eq("id", id);

  revalidatePath("/admin/inventory");
  revalidatePath("/admin");
}

export default async function InventoryPage() {
  const products = await getAllProducts();

  const totalValue = products.reduce(
    (sum, product) => sum + product.stock * product.price,
    0
  );

  return (
    <main className="min-h-screen bg-[#fafafa] px-10 py-16 text-black">
      <div className="mx-auto max-w-6xl">
        <Link href="/admin" className="text-sm font-semibold text-neutral-500">
          ← Back to Control Center
        </Link>

        <AdminTabs />

        <h1 className="mt-8 text-6xl font-semibold tracking-[-0.06em]">
          Inventory
        </h1>

        <p className="mt-4 text-xl text-neutral-500">
          Current inventory value:{" "}
          <span className="font-semibold text-black">${totalValue.toFixed(2)}</span>
        </p>

        <div className="mt-12 divide-y divide-neutral-200 rounded-[2rem] border border-neutral-200 bg-white">
          {products.map((product) => {
            const value = product.stock * product.price;

            return (
              <div
                key={product.id}
                className="grid gap-6 p-8 lg:grid-cols-[1fr_320px] lg:items-center"
              >
                <Link
                  href={`/admin/products/${product.slug}`}
                  className="flex items-center gap-5 transition hover:opacity-70"
                >
                  <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="80px"
                      className="object-contain p-2"
                    />
                  </div>

                  <div>
                    <p className="text-2xl font-semibold">{product.name}</p>
                    <p className="mt-2 text-neutral-500">
                      ${product.price.toFixed(2)} each · ${value.toFixed(2)} value
                    </p>
                  </div>
                </Link>

                <form action={updateStock} className="flex items-center justify-end gap-3">
                  <input type="hidden" name="id" value={product.id} />

                  <input
                    name="stock"
                    type="number"
                    min="0"
                    defaultValue={product.stock}
                    className="w-28 rounded-full border border-neutral-200 bg-white px-5 py-3 text-center font-semibold outline-none focus:border-neutral-950"
                  />

                  <button className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white">
                    Save
                  </button>

                  <Link
                    href={`/admin/products/${product.slug}`}
                    className="text-sm font-semibold text-neutral-500"
                  >
                    View →
                  </Link>
                </form>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
