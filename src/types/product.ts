export type ProductStatus = "active" | "draft" | "archived";

export type Product = {
  id: string;
  slug: string;
  sku: string;
  name: string;
  category: string;
  image: string;
  gallery: string[];
  price: number;
  currency: "CAD";
  status: ProductStatus;
  stock: number;
  purity: string;
  batch: string;
  size: string;
  certificateUrl?: string;
  description: string;
};
