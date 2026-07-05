import Link from "next/link";
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
    city?: string;
    province?: string;
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

const statuses = ["awaiting_payment", "paid", "processing", "shipped", "completed", "cancelled"];

async function updateOrderStatus(formData: FormData) {
  "use server";

  const supabase = await createSupabaseServerClient();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");

  await supabase.from("orders").update({ status }).eq("id", id);

  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}

export default async function AdminOrdersPage() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  const orders = (data || []) as OrderRow[];

  return (
    <main className="min-h-screen bg-[#fafafa] px-10 py-16 text-black">
      <div className="mx-auto max-w-7xl">
        <AdminTabs />

        <div className="mt-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">Admin</p>
            <h1 className="mt-4 text-6xl font-semibold tracking-[-0.06em]">Orders</h1>
          </div>

          <Link href="/admin" className="rounded-full border border-neutral-300 bg-white px-6 py-3 font-semibold">
            Back to dashboard
          </Link>
        </div>

        {error && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
            {error.message}
          </div>
        )}

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-neutral-200 bg-white">
          {orders.length === 0 ? (
            <div className="p-10 text-neutral-500">No orders yet.</div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="border-b border-neutral-100 p-6 last:border-b-0">
                <div className="flex flex-wrap items-start justify-between gap-6">
                  <div>
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-2xl font-semibold transition hover:text-neutral-500"
                    >
                      {order.order_number}
                    </Link>
                    <p className="mt-2 text-neutral-500">
                      {order.customer?.firstName} {order.customer?.lastName} · {order.customer?.email}
                    </p>
                    <p className="mt-1 text-neutral-500">
                      {new Date(order.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-semibold">
                      ${(order.total_cents / 100).toFixed(2)} {order.currency}
                    </p>
                    <p className="mt-2 capitalize text-neutral-500">{order.payment_method}</p>
                    <p className="mt-2 inline-flex rounded-full border border-neutral-200 px-4 py-2 text-sm capitalize">
                      {order.status.replace("_", " ")}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  {(order.items || []).map((item, index) => (
                    <div key={index} className="flex justify-between rounded-xl bg-neutral-50 px-4 py-3">
                      <span>{item.name} × {item.quantity}</span>
                      <span>${(item.line_total_cents / 100).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {statuses.map((status) => (
                    <form key={status} action={updateOrderStatus}>
                      <input type="hidden" name="id" value={order.id} />
                      <input type="hidden" name="status" value={status} />
                      <button className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm capitalize transition hover:bg-neutral-100">
                        {status.replace("_", " ")}
                      </button>
                    </form>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
