import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request)
{
    const json = await req.json();
    const { isSubcribed, stripeCustomerId, isCurrentPlan, customerEmail, stripePriceId, userId } = json;

    // This will manage user subscription
    if (isSubcribed && stripeCustomerId && isCurrentPlan) {
        const stripeSession = await stripe.billingPortal.sessions.create({
            customer: stripeCustomerId,
            return_url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/dashboard/create-cover-letter`
        });

        return new NextResponse(
            JSON.stringify({
                url: stripeSession.url
            })
        );
    }

    // This is for user subcribing for the first time
    const stripeSession = await stripe.checkout.sessions.create({
        success_url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/dashboard/create-cover-letter`,
        mode: "subscription",
        payment_method_types: [ "card" ],
        billing_address_collection: "auto",
        customer_email: customerEmail,
        line_items: [
            {
                price: stripePriceId,
                quantity: 1
            }
        ],
        metadata: {
            userId: userId
        }

    });

    return new NextResponse(
        JSON.stringify({
            url: stripeSession.url
        })
    );

}
