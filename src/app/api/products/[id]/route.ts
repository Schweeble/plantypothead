import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import Stripe from "stripe";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Fetch specific product from Stripe
    const product = await stripe.products.retrieve(id, {
      expand: ["default_price"],
    });

    // If product is not found or not active
    if (!product || !product.active) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const price = product.default_price as Stripe.Price;

    const formattedProduct = {
      id: product.id,
      name: product.name,
      description: product.description || "",
      image: product.images[0] || "/plant-placeholder.jpg",
      price: price.unit_amount ? price.unit_amount / 100 : 0,
      priceId: price.id,
    };

    return NextResponse.json(formattedProduct);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
