import Link from "next/link";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import AdminTabs from "@/components/AdminTabs";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type MessageRow = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  requested_product: string | null;
  message: string;
  status: string;
};

const statuses = ["new", "pending", "replied", "closed"];

async function updateMessageStatus(formData: FormData) {
  "use server";

  const supabase = await createSupabaseServerClient();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");

  await supabase.from("messages").update({ status }).eq("id", id);

  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

async function deleteMessage(formData: FormData) {
  "use server";

  const supabase = await createSupabaseServerClient();
  const id = String(formData.get("id") || "");

  await supabase.from("messages").delete().eq("id", id);

  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export default async function MessagesPage() {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  const messages = (data || []) as MessageRow[];

  return (
    <main className="min-h-screen bg-[#fafafa] px-10 py-16 text-black">
      <div className="mx-auto max-w-6xl">
        <Link href="/admin" className="text-sm font-semibold text-neutral-500">
          ← Back to Control Center
        </Link>

        <AdminTabs />

        <h1 className="mt-8 text-6xl font-semibold tracking-[-0.06em]">
          Messages
        </h1>

        <div className="mt-12 divide-y divide-neutral-200 rounded-[2rem] border border-neutral-200 bg-white">
          {messages.length === 0 ? (
            <p className="p-8 text-neutral-500">No messages yet.</p>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="p-8">
                <div className="flex flex-wrap items-start justify-between gap-6">
                  <div>
                    <p className="text-2xl font-semibold">
                      {msg.first_name} {msg.last_name}
                    </p>
                    <p className="mt-2 text-neutral-500">{msg.email}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold capitalize">
                      {msg.status}
                    </span>

                    <form action={deleteMessage}>
                      <input type="hidden" name="id" value={msg.id} />
                      <button className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
                        Delete
                      </button>
                    </form>
                  </div>
                </div>

                <p className="mt-6 font-semibold">{msg.subject}</p>

                {msg.requested_product && (
                  <p className="mt-2 text-neutral-500">
                    Requested product: {msg.requested_product}
                  </p>
                )}

                <p className="mt-5 leading-7 text-neutral-600">{msg.message}</p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {statuses.map((status) => (
                    <form key={status} action={updateMessageStatus}>
                      <input type="hidden" name="id" value={msg.id} />
                      <input type="hidden" name="status" value={status} />
                      <button className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold capitalize transition hover:bg-neutral-100">
                        {status}
                      </button>
                    </form>
                  ))}
                </div>

                <p className="mt-5 text-sm text-neutral-400">
                  {new Date(msg.created_at).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
