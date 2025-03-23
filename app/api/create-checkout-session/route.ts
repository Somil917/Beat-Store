import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/libs/stripe";
import { getURL } from "@/libs/helpers";
import { createOrRetrieveCustomer } from "@/libs/supabaseAdmin";
import { stringify } from "querystring";

export async function POST(request: Request) {
  const {
    price,
    beat,
    licenses,
    quantity = 1,
    metadata = {},
    purchaseType,
  } = await request.json();

  try {
    const supabase = createRouteHandlerClient({
      cookies,
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const customer = await createOrRetrieveCustomer({
      uuid: user?.id || "",
      email: user?.email || "",
    });

    if (!user) {
      return new NextResponse("User not authenticated", { status: 401 });
    }

    let session;

    if (purchaseType === "subscription") {
      // Subscription flow
      session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        billing_address_collection: "required",
        customer,
        line_items: [
          {
            price: price.id, // Price ID for the subscription
            quantity,
          },
        ],
        mode: "subscription",
        allow_promotion_codes: true,
        subscription_data: {
          trial_period_days: 7,
          metadata,
        },
        success_url: `${getURL()}/dashboard`,
        cancel_url: `${getURL()}`,
      });
    } else if (purchaseType === "beat_purchase") {
      // const { beatId, license_type, beatPrice } = metadata;

      // if (!beatId) {
      //   return new NextResponse("Missing beat ID in metadata", { status: 400 });
      // }

      if (!Array.isArray(licenses) || licenses.length === 0) {
        return new NextResponse("Invalid licenses data", { status: 400 });
      }

      const line_items = licenses.map((license) => ({
        price_data: {
          currency: "usd",
          product_data: {
            description: `License: ${license.license_type}`,
            name: license.title,
          },
          unit_amount: license.price * 100, // Price in cents, e.g., $50
        }, // Price ID for the beat
        quantity,
      }));

      session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        billing_address_collection: "required",
        customer,
        line_items,
        mode: "payment", // One-time payment
        metadata: {
          licenses: JSON.stringify(
            licenses.map(({ beat_id, license_type, price }) => ({
              beatId: beat_id,
              license_type,
              beatPrice: price,
            }))
          ), // Store as a JSON string
          userId: user.id,
        },
        success_url: `${getURL()}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${getURL()}/cart-checkout`,
      });
    } else {
      return new NextResponse("Invalid purchase type", { status: 400 });
    }

    return NextResponse.json({ sessionId: session.id });
  } catch (error: any) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
