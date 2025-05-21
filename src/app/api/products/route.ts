import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import Stripe from "stripe";

export async function GET() {
  try {
    // Fetch products from Stripe
    const products = await stripe.products.list({
      expand: ["data.default_price"],
      active: true,
    });

    // Transform the data to match our application's needs
    const formattedProducts = products.data.map((product) => {
      const price = product.default_price as Stripe.Price;

      return {
        id: product.id,
        name: product.name,
        description: product.description || "",
        image: product.images[0] || "/plant-placeholder.jpg",
        price: price.unit_amount ? price.unit_amount / 100 : 0,
        priceId: price.id,
      };
    });

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
