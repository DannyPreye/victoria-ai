import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { buffer } from "node:stream/consumers";



export async function POST(req: Request,)
{
    const body = req.body;
    const rawBody = await buffer(body as any);
    const signature = req.headers.get("stripe-signature");

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(rawBody, signature as string, process.env.STRIPE_WEBHOOK_SECRET as string);
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

        const userId = session.metadata.userId;
        const planId = session.metadata.planId;
        const jwt = session.metadata.jwt;
        const templateId = session.metadata.templateId;

        if (jwt) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/users/${userId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${jwt}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    plan: planId
                })
            });
            const data = await res.json();
        }

        if (templateId) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/create-document`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${jwt}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    templateId: templateId
                })
            });

            const data = await res.json();
        }
    }
    return new Response(null, { status: 200 });

}
