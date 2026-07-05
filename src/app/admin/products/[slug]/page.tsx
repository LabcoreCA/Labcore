import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/products";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import AdminTabs from "@/components/AdminTabs";

type OrderRow = {
  id: string;
  items: {
    slug: string;
    quantity: number;
    line_total_cents: number;
  }[];
  created_at: string;
};

export default async function AdminProductOverviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  const supabase = await createSupabaseServerClient();

  const { data: orders } = await supabase
    .from("orders")
    .select("id, items, created_at")
    .in("status", ["paid", "processing", "shipped", "completed"])
    .order("created_at", { ascending: false });

  const productOrders = ((orders || []) as OrderRow[]).filter((order) =>
    (order.items || []).some((item) => item.slug === product.slug)
  );

  const revenueGenerated = productOrders.reduce((sum, order) => {
    const matchingItems = (order.items || []).filter((item) => item.slug === product.slug);
    return sum + matchingItems.reduce((itemSum, item) => itemSum + item.line_total_cents / 100, 0);
  }, 0);

  const unitsSold = productOrders.reduce((sum, order) => {
    const matchingItems = (order.items || []).filter((item) => item.slug === product.slug);
    return sum + matchingItems.reduce((itemSum, item) => itemSum + item.quantity, 0);
  }, 0);

  const lastSale = productOrders[0]?.created_at
    ? new Date(productOrders[0].created_at).toLocaleDateString()
    : "Never";

  const inventoryValue = product.stock * product.price;

  return (
    <main className="min-h-screen bg-[#fafafa] px-10 py-16 text-black">
      <div className="mx-auto max-w-7xl">
        <Link href="/admin/inventory" className="text-sm font-semibold text-neutral-500">
          ← Back to Inventory
        </Link>

        <AdminTabs />

        <div className="mt-10 grid gap-8 lg:grid-cols-[420px_1fr]">
          <div className="relative flex min-h-[520px] items-center justify-center overflow-hidden rounded-[3rem] border border-neutral-200 bg-[#eeeeee]">
            <div className="absolute h-80 w-80 rounded-full bg-white blur-2xl" />
            <Image
              src={product.image}
              alt={product.name}
              width={360}
              height={520}
              className="relative z-10 h-[460px] w-auto object-contain mix-blend-multiply"
            />
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">
              Product Overview
            </p>

            <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
              <div>
                <h1 className="text-6xl font-semibold tracking-[-0.06em]">
                  {product.name}
                </h1>
                <p className="mt-4 text-xl text-neutral-500">Research Chemical</p>
              </div>

              <span className="rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold capitalize">
                {product.status}
              </span>
            </div>

            <section className="mt-10">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
                Performance
              </p>

              <div className="grid gap-5 md:grid-cols-3">
                <div className="rounded-[2rem] border border-neutral-200 bg-white p-7">
                  <p className="text-neutral-500">Revenue generated</p>
                  <p className="mt-4 text-3xl font-semibold">${revenueGenerated.toFixed(2)}</p>
                </div>

                <div className="rounded-[2rem] border border-neutral-200 bg-white p-7">
                  <p className="text-neutral-500">Units sold</p>
                  <p className="mt-4 text-3xl font-semibold">{unitsSold}</p>
                </div>

                <div className="rounded-[2rem] border border-neutral-200 bg-white p-7">
                  <p className="text-neutral-500">Last sale</p>
                  <p className="mt-4 text-3xl font-semibold">{lastSale}</p>
                </div>
              </div>
            </section>

            <section className="mt-8">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
                Inventory
              </p>

              <div className="grid gap-5 md:grid-cols-3">
                <div className="rounded-[2rem] border border-neutral-200 bg-white p-7">
                  <p className="text-neutral-500">Current stock</p>
                  <p className="mt-4 text-3xl font-semibold">{product.stock}</p>
                </div>

                <div className="rounded-[2rem] border border-neutral-200 bg-white p-7">
                  <p className="text-neutral-500">Inventory value</p>
                  <p className="mt-4 text-3xl font-semibold">${inventoryValue.toFixed(2)}</p>
                </div>

                <div className="rounded-[2rem] border border-neutral-200 bg-white p-7">
                  <p className="text-neutral-500">Price</p>
                  <p className="mt-4 text-3xl font-semibold">${product.price.toFixed(2)}</p>
                </div>
              </div>
            </section>

            <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-7">
              <h2 className="text-2xl font-semibold">Quick actions</h2>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <Link
                  href={`/admin/products/${product.slug}/edit`}
                  className="rounded-full bg-black px-6 py-4 text-center font-semibold text-white"
                >
                  Edit product
                </Link>

                <Link
                  href="/admin/inventory"
                  className="rounded-full border border-neutral-200 bg-white px-6 py-4 text-center font-semibold"
                >
                  Inventory
                </Link>

                <Link
                  href={`/products/${product.slug}`}
                  className="rounded-full border border-neutral-200 bg-white px-6 py-4 text-center font-semibold"
                >
                  Store page
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
