"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminStoragePage() {
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState("");

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

    const { data } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    setUrl(data.publicUrl);
    setUploading(false);
  }

  return (
    <main className="min-h-screen bg-[#fafafa] px-10 py-16 text-black">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">
          Admin
        </p>

        <h1 className="mt-4 text-6xl font-semibold tracking-[-0.06em]">
          Storage
        </h1>

        <div className="mt-12 rounded-[2rem] border border-neutral-200 bg-white p-8">
          <input type="file" accept="image/*" onChange={uploadImage} />

          {uploading && <p className="mt-6">Uploading...</p>}

          {url && (
            <div className="mt-8">
              <img src={url} alt="Uploaded product" className="w-64 rounded-2xl" />
              <p className="mt-4 break-all text-sm text-neutral-500">{url}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
