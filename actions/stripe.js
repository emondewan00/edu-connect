"use server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

export async function createCheckoutSession(data) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          product_data: {
            name: "EduConnect Subscription",
            description: "Monthly subscription",
          },
          unit_amount: 100,
        },
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
  });
}
