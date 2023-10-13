import GetRoute from "@/components/pages/dashboard/GetRoute";
import CreateCoverLetterPage from "@/components/pages/dashboard/create-cover-letter";
import SelectTemplatePage from "@/components/pages/dashboard/select-template";
import { queryPlans } from "@/lib/graphql-query";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import React from "react";

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

    return (
        <div>
            <CreateCoverLetterPage plans={plans} />
        </div>
    );
};

export default page;
