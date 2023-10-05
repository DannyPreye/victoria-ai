export const pricing = [
    {
        id: "basic",
        priceName: "Basic Plan",
        price: 10,
        pricingBenefits: [
            "Access to all basic features",
            "Basic reporting and analytics",
            "Up to 10 individual users",
            "20GB individual data each user",
            "Basic chat and email support"
        ],
        color: "#07397D",
        subTitle: "Our most popular plan.",
        stripePriceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PLAN_PRICE_ID ?? ""
    },
    {
        id: "business",
        priceName: "Business Plan",
        price: 20,
        pricingBenefits: [
            "Access to all basic features",
            "Basic reporting and analytics",
            "Up to 10 individual users",
            "20GB individual data each user",
            "Basic chat and email support"
        ],
        color: "#139DBC",
        subTitle: "Growing teams up to 20 users.",
        stripePriceId: process.env.NEXT_PUBLIC_STRIPE_BUSINESS_PLAN_PRICE_ID ?? ""
    },
    {
        id: "enterprice",
        priceName: "Enterprice Plan",
        price: 40,
        pricingBenefits: [
            "Access to all basic features",
            "Basic reporting and analytics",
            "Up to 10 individual users",
            "20GB individual data each user",
            "Basic chat and email support"
        ],
        color: "#E2BB53",
        subTitle: "Advanced features + unlimited users.",
        stripePriceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRICE_PLAN_PRICE_ID ?? ""
    },
];
