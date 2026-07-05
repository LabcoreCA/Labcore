"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function NewProductPage() {
  const router = useRouter();
  const supabase = createClient();

  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function uploadImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, file);

    if (error) {
      alert(error.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("products").getPublicUrl(fileName);

    setImageUrl(data.publicUrl);
    setUploading(false);
  }

  async function createProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);

    const formData = new FormData(event.currentTarget);

    const { error } = await supabase.from("products").insert({
      name: String(formData.get("name") || ""),
      slug: String(formData.get("slug") || ""),
      price: Number(formData.get("price") || 0),
      stock: Number(formData.get("stock") || 0),
      category: String(formData.get("category") || "Peptide"),
      image_url: imageUrl || "/products/bpc-157.png",
      purity: String(formData.get("purity") || ""),
      batch: String(formData.get("batch") || ""),
      description: String(formData.get("description") || ""),
      status: "active",
    });

    if (error) {
      alert(error.message);
      setSaving(false);
      return;
    }

    router.push("/admin/products");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#fafafa] px-10 py-16 text-black">
      <div className="mx-auto max-w-3xl">
        <Link href="/admin/products" className="text-sm font-semibold text-neutral-500">
          ← Back to products
        </Link>

        <p className="mt-10 text-sm uppercase tracking-[0.4em] text-neutral-500">
          Admin
        </p>

        <h1 className="mt-4 text-6xl font-semibold tracking-[-0.06em]">
          New product
        </h1>

        <form onSubmit={createProduct} className="mt-12 grid gap-5 rounded-[2rem] border border-neutral-200 bg-white p-8">
          <input name="name" className="rounded-2xl border border-neutral-200 px-5 py-4" placeholder="Product name" required />
          <input name="slug" className="rounded-2xl border border-neutral-200 px-5 py-4" placeholder="Slug" required />
          <input name="price" type="number" className="rounded-2xl border border-neutral-200 px-5 py-4" placeholder="Price in cents, example 6900" required />
          <input name="stock" type="number" className="rounded-2xl border border-neutral-200 px-5 py-4" placeholder="Stock" required />
          <input name="category" className="rounded-2xl border border-neutral-200 px-5 py-4" placeholder="Category" />

          <div className="rounded-2xl border border-neutral-200 p-5">
            <div className="rounded-[1.5rem] border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                🖼️
              </div>

              <p className="text-lg font-semibold">Product image</p>
              <p className="mt-2 text-sm text-neutral-500">
                Upload a clean product image. PNG, JPG or WEBP.
              </p>

              <label className="mt-6 inline-flex cursor-pointer items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]">
                Choose image
                <input type="file" accept="image/*" onChange={uploadImage} className="hidden" />
              </label>
            </div>

            {uploading && <p className="mt-4 text-sm text-neutral-500">Uploading...</p>}

            {imageUrl && (
              <div className="mt-5">
                <img src={imageUrl} alt="Uploaded product" className="h-48 rounded-2xl object-contain" />
                <p className="mt-3 break-all text-xs text-neutral-500">{imageUrl}</p>
              </div>
            )}
          </div>

          <input name="purity" className="rounded-2xl border border-neutral-200 px-5 py-4" placeholder="Purity" />
          <input name="batch" className="rounded-2xl border border-neutral-200 px-5 py-4" placeholder="Batch" />
          <textarea name="description" className="min-h-36 rounded-2xl border border-neutral-200 px-5 py-4" placeholder="Description" />

          <button disabled={saving || uploading} className="mt-4 rounded-full bg-black px-8 py-5 font-semibold text-white disabled:opacity-50">
            {saving ? "Saving..." : "Save product"}
          </button>
        </form>
      </div>
    </main>
  );
}
