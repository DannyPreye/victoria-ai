export const pricing = [
    {
        id: "basic",
        priceName: "Entry Level Starter",
        price: 4.99,
        pricingBenefits: [
            "One time purchase for up to 2 downloads.",
            "6 regenerations (3 per page) in the edit feature"
        ],
        color: "#07397D",
        subTitle: "Our most popular plan.",
        stripePriceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID ?? ""
    },
    {
        id: "business",
        priceName: "(Save $2.49) Manager's Pick",
        price: 9.99,
        pricingBenefits: [
            "One time purchase for up to 5 downloads",
            "15 regenerations (3 per page) in the edit feature"
        ],
        color: "#139DBC",
        subTitle: "Growing teams up to 20 users.",
        stripePriceId: process.env.NEXT_PUBLIC_STRIPE_MANAGER_PRICE_ID ?? ""
    },
    {
        id: "enterprice",
        priceName: "(Save $5.96) Executive Edition",
        price: 18.99,
        pricingBenefits: [
            "One time purchase for up to 10 downloads",
            "30 regenerations (3 per page) in the edit feature"
        ],
        color: "#E2BB53",
        subTitle: "Advanced features + unlimited users.",
        stripePriceId: process.env.NEXT_PUBLIC_STRIPE_EXECUTIVE_EDITION_PRICE_ID ?? ""
    },
];
