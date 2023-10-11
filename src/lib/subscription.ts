import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";
import { getServerSession } from "next-auth";
import { stripe } from "./stripe";
export async function getUserSubscriptionPlan()
{

    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("User not found");



    // Get the user data
    const { data: user } = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/users/me`, {
        headers: {
            Authorization: `Bearer ${session.jwt}`
        }
    });


    if (!user) throw new Error("User not found");


    // Check if the user is subscribed
    const isSubcribed = user?.stripePriceId && user.stripeCurrentPeriodEnd && new Date(user.stripeCurrentPeriodEnd).getTime() + 86_400_00 > Date.now();

    // Get the user plan
    let plan: any;
    if (isSubcribed) {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/plan/${session.user.id}`);
        plan = data;
    }

    // Check if the user has cancelled their subscription
    let isCancelled = false;
    if (isSubcribed && user.stipeSubscriptionId) {
        const stripePlan = await stripe.subscriptions.retrieve(user.subscriptionId);
        isCancelled = stripePlan.cancel_at_period_end;
    }

    return {
        ...plan,
        stripeSubscriptionId: user.stripeSubscriptionId,
        stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd,
        stripeCustomerId: user.stripeCustomerId,
        isCancelled,
        isSubcribed

    };

}
