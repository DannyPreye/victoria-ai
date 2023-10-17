// import GetRoute from "@/components/pages/dashboard/GetRoute";
import CreateCoverLetterPage from "@/components/pages/dashboard/create-cover-letter";
// import SelectTemplatePage from "@/components/pages/dashboard/select-template";
import { gqlQery } from "@/config/graphql.config";
import { queryPlans } from "@/lib/graphql-query";
// import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import React from "react";

const page = async () => {
    const plans = await gqlQery(queryPlans);

    return (
        <div>
            <CreateCoverLetterPage plans={plans} />
        </div>
    );
};

export default page;
