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
    const signature = headers().get("Stripe-Signature") ?? "";
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

        console.log("This is the planId", planId);

        console.log(event);
        console.log(session);

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
            //     await axios.put(`${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/users/${userId}`, { data: { plan: planId } }, {
            //     headers: {
            //         "Authorization": `Bearer ${jwt}`,
            //         "Content-Type": "application/json"
            //     }
            // });

            console.log(data);
        }

        // const line_items = await stripe.checkout.sessions.listLineItems(event.data.object.id);

        // const { data: resp } = await axios.put(`${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/users/${userSession?.user.id}`, {
        //     headers: {
        //         "Authorization": `Bearer ${userSession?.jwt}`
        //     },
        //     data: JSON.stringify({
        //         stripeSubscriptionId: subscription.id,
        //         stripeCustomerId: subscription.customer as string,
        //         stripePriceId: subscription.items.data[ 0 ].price.id,
        //         stripeCurrentPeriodEnd: new Date(
        //             subscription.current_period_end * 1000
        //         )
        //     })
        // });
    }




    return new Response(null, { status: 200 });

}
