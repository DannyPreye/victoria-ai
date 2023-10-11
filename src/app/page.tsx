import LandingPageLayout from "@/components/layouts/landing";
import HomePage from "@/components/pages/landing";
import Image from "next/image";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { queryHomePage } from "@/lib/graphql-query";

export const revalidate = 60;
export default async function Home() {
    const client = new ApolloClient({
        uri: `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_GRAPHQL}`,
        cache: new InMemoryCache(),
    });
    const { data } = await client.query({
        query: gql`
            ${queryHomePage}
        `,
    });

    return (
        <main className=''>
            <HomePage pageData={data} />
        </main>
    );
}
