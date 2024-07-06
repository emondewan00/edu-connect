"use server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

export async function createCheckoutSession(data) {
  const origin = headers().get("origin");
  const checkoutSession = await stripe.checkout.sessions.create({
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
    success_url: `${origin}/enroll-success?session_id={CHECKOUT_SESSION_ID}&course_id=123456`,
    cancel_url: `${origin}/dashboard`,
    ui_mode: "hosted",
    mode: "payment",
  });

  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
}
