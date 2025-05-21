import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import { CartItem } from "@/types/cart";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    // Prepare line items for Stripe
    const lineItems = items.map((item: CartItem) => ({
      price: item.priceId,
      quantity: item.quantity,
    }));

    // Get the origin for redirect URLs
    const origin = request.headers.get("origin") || "http://localhost:3000";

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      shipping_address_collection: {
        allowed_countries: ["US", "CA"], // Add or modify countries as needed
      },
      billing_address_collection: "auto",
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
