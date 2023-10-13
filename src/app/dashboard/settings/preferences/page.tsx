import React from "react";
import { ImPencil } from "react-icons/im";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { BiSolidCheckCircle } from "react-icons/bi";
import { pricing } from "@/config/subscription";
import PreferencesPage from "@/components/pages/dashboard/setting/Preference";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { queryPlans } from "@/lib/graphql-query";

const page = async () => {
    const client = new ApolloClient({
        uri: `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_GRAPHQL}`,
        cache: new InMemoryCache(),
    });
    const { data: plans } = await client.query({
        query: gql`
            ${queryPlans}
        `,
    });
    return <PreferencesPage plans={plans} />;
};

export default page;
