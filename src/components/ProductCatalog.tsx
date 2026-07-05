"use client";

import { useMemo, useState } from "react";
import type { Product } from "../types/product";
import ProductGrid from "./ProductGrid";

export default function ProductCatalog({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return products;

    return products.filter((product) =>
      [product.name, product.slug, product.batch, product.purity, product.size]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [products, search]);

  return (
    <div className="mt-12">
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search research chemicals..."
        className="w-full rounded-full border border-neutral-200 bg-white px-7 py-5 text-lg outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
      />

      {filteredProducts.length === 0 ? (
        <div className="mt-14 rounded-[2rem] border border-neutral-200 bg-white p-10 text-neutral-500">
          No research chemicals found.
        </div>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </div>
  );
}
