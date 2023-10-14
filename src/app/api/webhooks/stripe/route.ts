import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { auth } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";



export async function POST(req: Request,)
{
    const body = await req.text();
    const signature = headers().get("stripe-signature") ?? "";
    const userSession = await auth();
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

        const userId = session.metadata.userId;
        const planId = session.metadata.planId;
        const jwt = session.metadata.jwt;

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


            console.log(data);
        }


    }




    return new Response(null, { status: 200 });

}
