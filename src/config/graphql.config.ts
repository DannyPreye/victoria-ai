import { ApolloClient, InMemoryCache, NormalizedCacheObject, gql } from "@apollo/client";

export const gqlQery = async (query: string, jwt?: string) =>
{
    console.log(jwt);
    let client: ApolloClient<NormalizedCacheObject>;

    if (jwt) {
        client = new ApolloClient({
            uri: `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_GRAPHQL}`,
            cache: new InMemoryCache(),
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        });
    } else {
        client = new ApolloClient({
            uri: `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_GRAPHQL}`,
            cache: new InMemoryCache(),
        });
    }

    const { data } = await client.query({
        query: gql`
            ${query}
        `,
    });
    return data;
};
