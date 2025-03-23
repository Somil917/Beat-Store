import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "@/libs/stripe";
import {
  upsertProductRecord,
  upsertPriceRecord,
  manageSubscriptionStatusChange,
  recordBeatPurchase,
} from "@/libs/supabaseAdmin";

const relevantEvents = new Set([
  "product.created",
  "product.updated",
  "price.created",
  "price.updated",
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export async function POST(request: Request) {
  const body = await request.text();
  const sig = headers().get("Stripe-Signature");

  const webhooksSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  try {
    if (!sig || !webhooksSecret) return;
    event = stripe.webhooks.constructEvent(body, sig, webhooksSecret);
  } catch (error: any) {
    console.log("Error verifying webhook signature:", error.message);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case "product.created":
        case "product.updated":
          await upsertProductRecord(event.data.object as Stripe.Product);
          break;

        case "price.created":
        case "price.updated":
          await upsertPriceRecord(event.data.object as Stripe.Price);
          break;

        case "customer.subscription.created":
        case "customer.subscription.updated":
        case "customer.subscription.deleted":
          const subscription = event.data.object as Stripe.Subscription;
          await manageSubscriptionStatusChange(
            subscription.id,
            subscription.customer as string,
            event.type === "customer.subscription.created"
          );
          break;

        case "checkout.session.completed":
          const checkoutSession = event.data.object as Stripe.Checkout.Session;

          if (checkoutSession.mode === "subscription") {
            // Handle subscription checkout
            const subscriptionId = checkoutSession.subscription as string;
            await manageSubscriptionStatusChange(
              subscriptionId,
              checkoutSession.customer as string,
              true
            );
          } else if (checkoutSession.mode === "payment") {
            // Handle one-time beat purchase

            const amountPaid = checkoutSession.amount_total
              ? checkoutSession.amount_total / 100
              : 0;

            const metadata = checkoutSession.metadata;
            // const beatId = metadata?.beatId;  // Access beatId from metadata
            const userId = metadata?.userId; // Access userId from metadata
            // const license_type = metadata?.license_type;  // Access license_type from metadata

            if (!metadata?.licenses || !userId) {
              console.error("Missing required metadata for beat purchase");
              return new NextResponse("Missing metadata", { status: 400 });
            }

            const licenses = JSON.parse(metadata.licenses);

            const paymentStatus = checkoutSession.payment_status;
            const sessionId = checkoutSession.id;
            const paymentId = checkoutSession.payment_intent as string;

            for (const license of licenses) {
              await recordBeatPurchase(
                sessionId,
                paymentId,
                userId,
                license.license_type,
                license.beatId,
                license.beatPrice,
                paymentStatus
              );
            }

            console.log(
              `Successfully recorded ${licenses.length} beat purchases.`
            );
          }
          break;

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }
    } catch (error: any) {
      console.error("Error processing event:", error.message);
      return new NextResponse("Webhook handler error", { status: 500 });
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
