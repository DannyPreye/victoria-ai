// import GetRoute from "@/components/pages/dashboard/GetRoute";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import CreateCoverLetterPage from "@/components/pages/dashboard/create-cover-letter";
// import SelectTemplatePage from "@/components/pages/dashboard/select-template";
import { gqlQery } from "@/config/graphql.config";
import { queryPlans } from "@/lib/graphql-query";
// import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import React from "react";
interface Props {}
const page = async ({}: Props) => {
    const session = await auth();
    // const plans = await gqlQery(queryPlans);
    // const { } =
    return (
        <div>
            <CreateCoverLetterPage />
        </div>
    );
};

export default page;
