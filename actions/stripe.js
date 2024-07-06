"use server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

export async function createCheckoutSession(data) {
  const origin = headers().get("origin");
  const courseId = data.get("courseId");
  const price = data.get("price") * 100;
  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          product_data: {
            name: data.get("courseName"),
          },
          unit_amount: price,
        },
      },
    ],
    success_url: `${origin}/enroll-success?session_id={CHECKOUT_SESSION_ID}&course_id=${courseId}`,
    cancel_url: `${origin}/courses`,
    ui_mode: "hosted",
    mode: "payment",
  });

  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
}

export async function createPaymentIntent(data) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100,
      automatic_payment_methods: { enabled: true },

      currency: "USD",
    });

    return { client_secret: paymentIntent.client_secret };
  } catch (error) {
    console.log(error,"error creating payment intent ");
  }
}
