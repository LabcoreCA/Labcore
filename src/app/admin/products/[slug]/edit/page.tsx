import EditProductForm from "./EditProductForm";
import { getProduct } from "@/lib/products";
import { notFound } from "next/navigation";


export const dynamic = "force-dynamic";
export default async function EditProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  return <EditProductForm product={product} />;
}
