import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../auth/[...nextauth]/route";

export async function POST(req: Request)
{
    const json = await req.json();
    const { productName, customerEmail, userId, amount, planId, callbackURL, templateId } = json;
    const userSession = await auth();


    const stripeSession = await stripe.checkout.sessions.create({
        success_url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}${callbackURL}`,
        mode: "payment",
        payment_method_types: [ "card" ],
        billing_address_collection: "auto",
        customer_email: customerEmail,
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    unit_amount: parseInt(amount),
                    product_data: {
                        name: productName,

                    },
                },
                quantity: 1
            }
        ],
        metadata: {
            userId: userId,
            planId,
            // Sending the jwt so that we can easily make a patch request to strapi to update the user
            jwt: userSession?.jwt ?? "",
            templateId: templateId ?? ""
        }

    });

    return new NextResponse(
        JSON.stringify({
            url: stripeSession.url
        })
    );

}
