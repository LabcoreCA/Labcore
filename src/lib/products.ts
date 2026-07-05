import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Product } from "@/types/product";

type SupabaseProduct = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  stock: number | null;
  category: string | null;
  image_url: string | null;
  purity: string | null;
  batch: string | null;
  coa_url: string | null;
  status: "active" | "draft" | "archived" | null;
};

function mapProduct(product: SupabaseProduct): Product {
  return {
    id: product.id,
    slug: product.slug,
    sku: product.batch || product.slug.toUpperCase(),
    name: product.name,
    category: product.category || "Research",
    image: product.image_url || "/products/bpc-157.png",
    gallery: [product.image_url || "/products/bpc-157.png"],
    price: product.price / 100,
    currency: "CAD",
    status: product.status || "active",
    stock: product.stock || 0,
    purity: product.purity || "",
    batch: product.batch || "",
    size: "5mg",
    certificateUrl: product.coa_url || undefined,
    description: product.description || "",
  };
}

export async function getProducts(): Promise<Product[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }

  return (data || []).map(mapProduct);
}

export async function getProduct(slug: string): Promise<Product | null> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching product:", error.message);
    return null;
  }

  return mapProduct(data);
}

export async function getAllProducts(): Promise<Product[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching all products:", error.message);
    return [];
  }

  return (data || []).map(mapProduct);
}
