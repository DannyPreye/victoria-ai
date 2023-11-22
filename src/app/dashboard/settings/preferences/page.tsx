import PreferencesPage from "./components";
import { queryPlans } from "@/utils/gql/plan.gql";
import { gqlQery } from "@/config/grapql/graphql.config";

const page = async () => {
    const plans = await gqlQery(queryPlans);
    return <PreferencesPage plans={plans} />;
};

export default page;
