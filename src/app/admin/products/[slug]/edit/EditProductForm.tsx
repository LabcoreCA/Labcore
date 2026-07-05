"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/types/product";

export default function EditProductForm({ product }: { product: Product }) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(product.image);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function uploadImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    const { error } = await supabase.storage.from("products").upload(fileName, file);

    if (error) {
      alert(error.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("products").getPublicUrl(fileName);
    setImageUrl(data.publicUrl);
    setUploading(false);
  }

  async function updateProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);

    const formData = new FormData(event.currentTarget);
    const newSlug = String(formData.get("slug") || product.slug);

    const { error } = await supabase
      .from("products")
      .update({
        name: String(formData.get("name") || ""),
        slug: newSlug,
        price: Number(formData.get("price") || 0),
        stock: Number(formData.get("stock") || 0),
        category: String(formData.get("category") || "Peptide"),
        image_url: imageUrl,
        purity: String(formData.get("purity") || ""),
        batch: String(formData.get("batch") || ""),
        description: String(formData.get("description") || ""),
        status: String(formData.get("status") || "active"),
      })
      .eq("id", product.id);

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

        <p className="mt-10 text-sm uppercase tracking-[0.4em] text-neutral-500">Admin</p>

        <h1 className="mt-4 text-6xl font-semibold tracking-[-0.06em]">
          Edit product
        </h1>

        <form onSubmit={updateProduct} className="mt-12 grid gap-5 rounded-[2rem] border border-neutral-200 bg-white p-8">
          <input name="name" defaultValue={product.name} className="rounded-2xl border border-neutral-200 px-5 py-4" placeholder="Product name" required />
          <input name="slug" defaultValue={product.slug} className="rounded-2xl border border-neutral-200 px-5 py-4" placeholder="Slug" required />
          <input name="price" type="number" defaultValue={product.price * 100} className="rounded-2xl border border-neutral-200 px-5 py-4" placeholder="Price in cents" required />
          <input name="stock" type="number" defaultValue={product.stock} className="rounded-2xl border border-neutral-200 px-5 py-4" placeholder="Stock" required />
          <input name="category" defaultValue={product.category} className="rounded-2xl border border-neutral-200 px-5 py-4" placeholder="Category" />

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
                <input
                  type="file"
                  accept="image/*"
                  onChange={uploadImage}
                  className="hidden"
                />
              </label>
            </div>

            {uploading && <p className="mt-4 text-sm text-neutral-500">Uploading...</p>}

            {imageUrl && (
              <div className="mt-5">
                <img src={imageUrl} alt="Product preview" className="h-56 rounded-2xl object-contain" />
                <p className="mt-3 break-all text-xs text-neutral-500">{imageUrl}</p>

                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="mt-4 rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  Remove image
                </button>
              </div>
            )}
          </div>

          <input name="purity" defaultValue={product.purity} className="rounded-2xl border border-neutral-200 px-5 py-4" placeholder="Purity" />
          <input name="batch" defaultValue={product.batch} className="rounded-2xl border border-neutral-200 px-5 py-4" placeholder="Batch" />

          <select name="status" defaultValue={product.status} className="rounded-2xl border border-neutral-200 px-5 py-4">
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          <textarea name="description" defaultValue={product.description} className="min-h-36 rounded-2xl border border-neutral-200 px-5 py-4" placeholder="Description" />

          <button disabled={saving || uploading} className="mt-4 rounded-full bg-black px-8 py-5 font-semibold text-white disabled:opacity-50">
            {saving ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </main>
  );
}
