import HomePage from "./components";
import { gqlQery } from "@/config/grapql/graphql.config";
import { queryHomePage } from "@/utils/gql/fetchHomepage";

export default async function Home() {
    const data = await gqlQery(queryHomePage);

    return <HomePage pageData={data} />;
}
