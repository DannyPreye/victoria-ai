import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";


export default async function POST(req: Request)
{
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") ?? "";
    const userSession = await getServerSession(authOptions);

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET as string);
    } catch (error) {
        return new Response(
            `Webhook Error: ${error instanceof Error ? error.message : "Uknown Error"}`,
            { status: 400 }
        );
    }


    const session = event.data.object as Stripe.Checkout.Session;

    if (!session?.metadata?.userId) {
        return new Response(null, { status: 200 });
    }

    if (event.type === "checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription?.toString() as string
        );
    }

}
