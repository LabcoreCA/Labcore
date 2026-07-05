"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CartDrawer from "./CartDrawer";
import { createClient } from "@/lib/supabase/client";

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    async function checkSession() {
      const { data } = await supabase.auth.getUser();
      setIsAdmin(Boolean(data.user));
    }

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(Boolean(session?.user));
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-[#fafafa]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-24 max-w-[1500px] items-center justify-between px-16">
        <Link
          href="/"
          className="text-3xl font-medium tracking-[0.35em] hover:opacity-80"
        >
          LABCORE
        </Link>

        <nav className="hidden items-center gap-12 text-lg md:flex">
          <Link href="/products">Catalog</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          {isAdmin && <Link href="/admin">Admin</Link>}
        </nav>

        <CartDrawer />
      </div>
    </header>
  );
}
