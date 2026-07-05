"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/inventory", label: "Inventory" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/activity", label: "Activity" },
];

export default function AdminTabs() {
  const pathname = usePathname();

  return (
    <nav className="mt-10 flex flex-wrap gap-3">
      {tabs.map((tab) => {
        const active =
          pathname === tab.href ||
          (tab.href !== "/admin" && pathname.startsWith(tab.href));

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              active
                ? "bg-black text-white"
                : "border border-neutral-200 bg-white hover:bg-neutral-100"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
