import { supabase } from "@/lib/supabase";

export default async function SupabaseTestPage() {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    return (
      <main className="p-10">
        <h1 className="text-red-600 font-bold">Erreur</h1>
        <pre>{error.message}</pre>
      </main>
    );
  }

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">Supabase Test</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
