import Link from "next/link";
import AdminLogoutButton from "./AdminLogoutButton";
import AdminTabs from "@/components/AdminTabs";
import { getAllProducts } from "@/lib/products";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type OrderRow = {
  id: string;
  order_number: string;
  total_cents: number;
  currency: string;
  payment_method: string;
  status: string;
  created_at: string;
  customer: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
};

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient();
  const products = await getAllProducts();

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: messages } = await supabase
    .from("messages")
    .select("status");

  const safeOrders = (orders || []) as OrderRow[];

  const paidOrders = safeOrders.filter((order) =>
    ["paid", "processing", "shipped", "completed"].includes(order.status)
  );

  const totalRevenue = paidOrders.reduce((sum, order) => sum + order.total_cents / 100, 0);

  const today = new Date().toDateString();

  const todayOrders = safeOrders.filter(
    (order) => new Date(order.created_at).toDateString() === today
  );

  const todayRevenue = todayOrders
    .filter((order) => ["paid", "processing", "shipped", "completed"].includes(order.status))
    .reduce((sum, order) => sum + order.total_cents / 100, 0);

  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const inventoryValue = products.reduce((sum, product) => sum + product.stock * product.price, 0);
  const awaitingPayment = safeOrders.filter((order) => order.status === "awaiting_payment").length;
  const lowStockProducts = products.filter((product) => product.stock <= 5);
  const recentOrders = safeOrders.slice(0, 5);

  return (
    <main className="min-h-screen bg-[#fafafa] px-10 py-16 text-black">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">LabCore Admin</p>
            <h1 className="mt-4 text-6xl font-semibold tracking-[-0.06em]">
              Control Center
            </h1>
            <p className="mt-5 text-xl text-neutral-500">
              Here&apos;s what&apos;s happening at LabCore today.
            </p>
          </div>

        <AdminTabs />

          <AdminLogoutButton />
        </div>

        <section className="mt-14">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
            Today
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <Link
              href="/admin/orders?today=1&status=paid"
              className="rounded-[2rem] border border-neutral-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <p className="text-neutral-500">Revenue today</p>
              <p className="mt-4 text-4xl font-semibold">${todayRevenue.toFixed(2)}</p>
            </Link>

            <Link
              href="/admin/orders?today=1"
              className="rounded-[2rem] border border-neutral-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <p className="text-neutral-500">Orders today</p>
              <p className="mt-4 text-4xl font-semibold">{todayOrders.length}</p>
            </Link>

            <Link
              href="/admin/orders?status=awaiting_payment"
              className="rounded-[2rem] border border-neutral-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <p className="text-neutral-500">Awaiting payment</p>
              <p className="mt-4 text-4xl font-semibold">{awaitingPayment}</p>
            </Link>
          </div>
        </section>

        <section className="mt-12">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
            Business
          </p>

          <div className="grid gap-6 md:grid-cols-5">
            <Link
              href="/admin/orders?paid=1"
              className="rounded-[2rem] border border-neutral-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <p className="text-neutral-500">Total revenue</p>
              <p className="mt-4 text-4xl font-semibold">${totalRevenue.toFixed(2)}</p>
            </Link>

            <Link
              href="/admin/inventory"
              className="rounded-[2rem] border border-neutral-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <p className="text-neutral-500">Inventory value</p>
              <p className="mt-4 text-4xl font-semibold">${inventoryValue.toFixed(2)}</p>
            </Link>

            <Link
              href="/admin/products"
              className="rounded-[2rem] border border-neutral-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <p className="text-neutral-500">Products</p>
              <p className="mt-4 text-4xl font-semibold">{products.length}</p>
            </Link>

            <Link
              href="/admin/products"
              className="rounded-[2rem] border border-neutral-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <p className="text-neutral-500">Total stock</p>
              <p className="mt-4 text-4xl font-semibold">{totalStock}</p>
            </Link>
          </div>
        </section>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <section className="rounded-[2rem] border border-neutral-200 bg-white p-8">
            <div className="flex items-center justify-between gap-6">
              <h2 className="text-3xl font-semibold">Latest orders</h2>
              <Link href="/admin/orders" className="text-sm font-semibold text-neutral-500">
                View all →
              </Link>
            </div>

            <div className="mt-6 divide-y divide-neutral-100">
              {recentOrders.length === 0 ? (
                <p className="py-6 text-neutral-500">No orders yet.</p>
              ) : (
                recentOrders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/admin/orders/${order.id}`}
                    className="flex items-center justify-between gap-6 py-5 transition hover:bg-neutral-50"
                  >
                    <div>
                      <p className="font-semibold">{order.order_number}</p>
                      <p className="mt-1 text-sm text-neutral-500">
                        {order.customer?.firstName} {order.customer?.lastName} · {order.customer?.email}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold">
                        ${(order.total_cents / 100).toFixed(2)} {order.currency}
                      </p>
                      <p className="mt-1 text-sm capitalize text-neutral-500">
                        {order.status.replace("_", " ")}
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </section>

          <section className="rounded-[2rem] border border-neutral-200 bg-white p-8">
            <h2 className="text-3xl font-semibold">Low stock</h2>

            <div className="mt-6 divide-y divide-neutral-100">
              {lowStockProducts.length === 0 ? (
                <p className="py-6 text-neutral-500">No low stock products.</p>
              ) : (
                lowStockProducts.slice(0, 6).map((product) => (
                  <div key={product.id} className="flex items-center justify-between gap-6 py-5">
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="mt-1 text-sm text-neutral-500">{product.batch}</p>
                    </div>

                    <p className="font-semibold">{product.stock} left</p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>


        <section className="mt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Recent activity</h2>

            <Link
              href="/admin/activity"
              className="text-sm font-semibold text-neutral-500"
            >
              View all →
            </Link>
          </div>

          <div className="mt-6 rounded-[2rem] border border-neutral-200 bg-white p-8">
            <p className="text-neutral-500">
              Activity feed coming soon.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
            Quick actions
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <Link href="/admin/products" className="rounded-[2rem] border border-neutral-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl">
              <h2 className="text-3xl font-semibold">Products</h2>
              <p className="mt-4 text-neutral-500">Manage catalog, pricing, stock, and status.</p>
            </Link>

            <Link href="/admin/orders" className="rounded-[2rem] border border-neutral-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl">
              <h2 className="text-3xl font-semibold">Orders</h2>
              <p className="mt-4 text-neutral-500">View payments, status, and fulfillment.</p>
            </Link>

            <Link href="/admin/customers" className="rounded-[2rem] border border-neutral-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl">
              <h2 className="text-3xl font-semibold">Customers</h2>
              <p className="mt-4 text-neutral-500">Customer profiles and order history.</p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
