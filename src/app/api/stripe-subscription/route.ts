import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request)
{
    const json = await req.json();
    const { productName, customerEmail, userId, amount } = json;


    // const oneTimePrice = await stripe.prices.create({
    //     unit_amount: 1000, // The amount in cents (e.g., $10.00)
    //     currency: 'usd', // The currency of the price
    //     product: {
    //         name: 'Product Name', // The name of your product
    //         description: 'Product Description', // Optional: Description of your product
    //         images: [ 'https://example.com/product-image.jpg' ], // Optional: URL to an image of your product
    //     },
    // })

    const stripeSession = await stripe.checkout.sessions.create({
        success_url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/dashboard/create-cover-letter`,
        mode: "payment",
        payment_method_types: [ "card" ],
        billing_address_collection: "auto",
        customer_email: customerEmail,
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    unit_amount: amount,
                    product_data: {
                        name: productName,

                    },


                },
                quantity: 1

            }
        ],
        metadata: {
            userId: userId
        }

    });


    // This will manage user subscription
    // if (isSubcribed && stripeCustomerId && isCurrentPlan) {
    //     const stripeSession = await stripe.billingPortal.sessions.create({
    //         customer: stripeCustomerId,
    //         return_url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/dashboard/create-cover-letter`
    //     });

    //     return new NextResponse(
    //         JSON.stringify({
    //             url: stripeSession.url
    //         })
    //     );
    // }

    // // This is for user subcribing for the first time


    return new NextResponse(
        JSON.stringify({
            url: stripeSession.url
        })
    );

}
