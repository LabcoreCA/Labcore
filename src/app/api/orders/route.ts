import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type CheckoutItem = {
  slug: string;
  quantity: number;
};

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const body = await request.json();

    const items: CheckoutItem[] = body.items || [];
    const customer = body.customer || {};
    const paymentMethod = body.paymentMethod || "interac";

    if (!items.length) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
    }

    const slugs = items.map((item) => item.slug);

    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("id, slug, name, price, image_url, stock")
      .in("slug", slugs);

    if (productsError) {
      return NextResponse.json({ error: productsError.message }, { status: 500 });
    }

    if (!products || products.length === 0) {
      return NextResponse.json({ error: "No matching products found." }, { status: 404 });
    }

    const orderItems = items.map((item) => {
      const product = products.find((p) => p.slug === item.slug);
      if (!product) throw new Error(`Product not found: ${item.slug}`);

      const availableStock = product.stock || 0;

      if (item.quantity > availableStock) {
        throw new Error(`Insufficient stock for ${product.name}. Available: ${availableStock}.`);
      }

      return {
        product_id: product.id,
        slug: product.slug,
        name: product.name,
        image: product.image_url,
        price_cents: product.price,
        quantity: item.quantity,
        line_total_cents: product.price * item.quantity,
      };
    });

    const totalCents = orderItems.reduce((sum, item) => sum + item.line_total_cents, 0);
    const orderNumber = `LC-${Date.now().toString().slice(-6)}`;

    const { error: insertError } = await supabase.from("orders").insert({
      order_number: orderNumber,
      customer,
      items: orderItems,
      total_cents: totalCents,
      currency: "CAD",
      payment_method: paymentMethod,
      status: "awaiting_payment",
    });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    for (const item of orderItems) {
      const product = products.find((p) => p.slug === item.slug);
      if (!product) continue;

      const newStock = Math.max((product.stock || 0) - item.quantity, 0);

      const { error: stockError } = await supabase
        .from("products")
        .update({ stock: newStock })
        .eq("id", product.id);

      if (stockError) {
        return NextResponse.json({ error: stockError.message }, { status: 500 });
      }
    }

    return NextResponse.json({ orderNumber, total: totalCents / 100 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected server error." },
      { status: 500 }
    );
  }
}
