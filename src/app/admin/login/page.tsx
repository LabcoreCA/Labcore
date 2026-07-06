"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f4ef] px-6">
      <div className="w-full max-w-md rounded-[2rem] border border-black/10 bg-white p-8 shadow-2xl shadow-black/10">
        <div className="mb-8 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
            LABCORE
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-950">
            Admin Login
          </h1>
          <p className="mt-3 text-sm text-neutral-500">
            Secure access to the LabCore operations dashboard.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-950 outline-none transition focus:border-neutral-950 focus:bg-white"
              placeholder="admin@labcore.ca"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-950 outline-none transition focus:border-neutral-950 focus:bg-white"
              placeholder="••••••••"
            />
          </div>

          {errorMessage && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-neutral-950 px-6 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
