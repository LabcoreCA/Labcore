import Link from "next/link";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import AdminTabs from "@/components/AdminTabs";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type OrderRow = {
  id: string;
  order_number: string;
  customer: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    province?: string;
    postalCode?: string;
    country?: string;
  };
  items: {
    name: string;
    quantity: number;
    line_total_cents: number;
  }[];
  total_cents: number;
  currency: string;
  payment_method: string;
  status: string;
  created_at: string;
};

const nextStatus: Record<string, { label: string; value: string }> = {
  awaiting_payment: { label: "Mark as paid", value: "paid" },
  paid: { label: "Prepare order", value: "processing" },
  processing: { label: "Mark as shipped", value: "shipped" },
  shipped: { label: "Complete order", value: "completed" },
};

async function updateOrderStatus(formData: FormData) {
  "use server";

  const supabase = await createSupabaseServerClient();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");

  await supabase.from("orders").update({ status }).eq("id", id);

  revalidatePath(`/admin/orders/${id}`);
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}

export default async function OrderOverviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();

  const order = data as OrderRow;
  const action = nextStatus[order.status];

  return (
    <main className="min-h-screen bg-[#fafafa] px-10 py-16 text-black">
      <div className="mx-auto max-w-7xl">
        <Link href="/admin/orders" className="text-sm font-semibold text-neutral-500">
          ← Back to Orders
        </Link>

        <AdminTabs />

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">
              Order Overview
            </p>
            <h1 className="mt-4 text-6xl font-semibold tracking-[-0.06em]">
              {order.order_number}
            </h1>
            <p className="mt-4 text-xl text-neutral-500">
              {new Date(order.created_at).toLocaleString()}
            </p>
          </div>

          <span className="rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold capitalize">
            {order.status.replace("_", " ")}
          </span>
        </div>

        <section className="mt-12 grid gap-6 md:grid-cols-4">
          <div className="rounded-[2rem] border border-neutral-200 bg-white p-8">
            <p className="text-neutral-500">Total</p>
            <p className="mt-4 text-4xl font-semibold">
              ${(order.total_cents / 100).toFixed(2)}
            </p>
          </div>

          <div className="rounded-[2rem] border border-neutral-200 bg-white p-8">
            <p className="text-neutral-500">Items</p>
            <p className="mt-4 text-4xl font-semibold">{order.items?.length || 0}</p>
          </div>

          <div className="rounded-[2rem] border border-neutral-200 bg-white p-8">
            <p className="text-neutral-500">Payment</p>
            <p className="mt-4 text-4xl font-semibold capitalize">{order.payment_method}</p>
          </div>

          <div className="rounded-[2rem] border border-neutral-200 bg-white p-8">
            <p className="text-neutral-500">Currency</p>
            <p className="mt-4 text-4xl font-semibold">{order.currency}</p>
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[2rem] border border-neutral-200 bg-white p-8">
            <h2 className="text-3xl font-semibold">Items</h2>

            <div className="mt-6 divide-y divide-neutral-100">
              {(order.items || []).map((item, index) => (
                <div key={index} className="flex items-center justify-between gap-6 py-5">
                  <div>
                    <p className="text-xl font-semibold">{item.name}</p>
                    <p className="mt-1 text-neutral-500">Quantity: {item.quantity}</p>
                  </div>

                  <p className="text-xl font-semibold">
                    ${(item.line_total_cents / 100).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-neutral-200 bg-white p-8">
            <h2 className="text-3xl font-semibold">Customer</h2>

            <div className="mt-6 space-y-4 text-neutral-600">
              <p className="text-xl font-semibold text-black">
                {order.customer?.firstName} {order.customer?.lastName}
              </p>
              <p>{order.customer?.email || "No email"}</p>
              <p>{order.customer?.phone || "No phone"}</p>
              <p>
                {[order.customer?.address, order.customer?.city, order.customer?.province, order.customer?.postalCode]
                  .filter(Boolean)
                  .join(", ") || "No shipping address"}
              </p>
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-8">
          <h2 className="text-3xl font-semibold">Workflow</h2>

          <div className="mt-6 flex flex-wrap gap-3">
            {action ? (
              <form action={updateOrderStatus}>
                <input type="hidden" name="id" value={order.id} />
                <input type="hidden" name="status" value={action.value} />
                <button className="rounded-full bg-black px-8 py-4 font-semibold text-white">
                  {action.label}
                </button>
              </form>
            ) : (
              <p className="rounded-full border border-neutral-200 bg-white px-6 py-4 font-semibold text-neutral-500">
                No next action
              </p>
            )}

            <Link
              href="/admin/orders"
              className="rounded-full border border-neutral-200 bg-white px-8 py-4 font-semibold"
            >
              All orders
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
