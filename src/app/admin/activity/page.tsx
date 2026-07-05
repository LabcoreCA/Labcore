import Link from "next/link";
import AdminTabs from "@/components/AdminTabs";

export default function ActivityPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] px-10 py-16 text-black">
      <div className="mx-auto max-w-5xl">
        <Link href="/admin" className="text-sm font-semibold text-neutral-500">
          ← Back to Control Center
        </Link>

        <AdminTabs />

        <h1 className="mt-8 text-6xl font-semibold tracking-[-0.06em]">
          Activity
        </h1>

        <p className="mt-4 text-xl text-neutral-500">
          A chronological feed of what happens inside LabCore.
        </p>

        <div className="mt-12 rounded-[2rem] border border-neutral-200 bg-white p-8">
          <p className="text-neutral-500">
            Activity tracking will appear here once inventory adjustments, order updates, and product events are connected.
          </p>
        </div>
      </div>
    </main>
  );
}
