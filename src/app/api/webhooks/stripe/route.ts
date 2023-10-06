import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "inspector";


export async function POST(req: Request,)
{
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") ?? "";
    const userSession = await getServerSession(authOptions);

    console.log("OKAT------", userSession);

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET as string);
    } catch (error) {
        return new Response(
            `Webhook Error: ${error instanceof Error ? error.message : "Uknown Error"}`,
            { status: 400 }
        );
    }

    console.log("THIS IS THE USER ID", userSession);
    const session = event.data.object as Stripe.Checkout.Session;

    if (!session?.metadata?.userId) {
        return new Response(null, { status: 200 });
    }

    if (event.type === "checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription?.toString() as string
        );
        const { data: resp } = await axios.put(`${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/users/${userSession?.user.id}`, {
            headers: {
                "Authorization": `Bearer ${userSession?.jwt}`
            },
            data: JSON.stringify({
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId: subscription.items.data[ 0 ].price.id,
                stripeCurrentPeriodEnd: new Date(
                    subscription.current_period_end * 1000
                )
            })
        });
    }

    if (event.type == "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription?.toString() as string
        );
        data: JSON.stringify({
            // stripeSubscriptionId: subscription.id,
            // stripeCustomerId: subscription.customer as string,
            stripePriceId: subscription.items.data[ 0 ].price.id,
            stripeCurrentPeriodEnd: new Date(
                subscription.current_period_end * 1000
            )
        });
    }


    return new Response(null, { status: 200 });

}
