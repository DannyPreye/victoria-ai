import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const gqlQery = async (query: string, jwt: string) =>
{
    const client = new ApolloClient({
        uri: `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_GRAPHQL}`,
        cache: new InMemoryCache(),
        headers: {
            "Authorization": `Bearer ${jwt}`
        }
    });
    const { data } = await client.query({
        query: gql`
            ${query}
        `,
    });
    return data;
};
