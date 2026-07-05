import { headers } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminDebugPage() {
  const h = await headers();
  const supabase = await createSupabaseServerClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();

  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("id, order_number, status, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <main className="min-h-screen bg-[#fafafa] p-10 font-mono text-sm text-black">
      <h1 className="mb-6 text-3xl font-bold">Admin Debug</h1>

      <pre className="whitespace-pre-wrap rounded-2xl bg-white p-6">
{JSON.stringify({
  cookie: h.get("cookie"),
  userEmail: userData.user?.email || null,
  userError: userError?.message || null,
  ordersError: ordersError?.message || null,
  ordersLength: orders?.length || 0,
  orders,
}, null, 2)}
      </pre>
    </main>
  );
}
