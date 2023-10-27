import LandingPageLayout from "@/components/layouts/landing";
import HomePage from "@/components/pages/landing";
import Image from "next/image";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { queryHomePage } from "@/lib/graphql-query";
import { gqlQery } from "@/config/graphql.config";

export const revalidate = 60;
export default async function Home() {
    const data = await gqlQery(queryHomePage);

    return (
        <main className=''>
            <HomePage pageData={data} />
        </main>
    );
}
