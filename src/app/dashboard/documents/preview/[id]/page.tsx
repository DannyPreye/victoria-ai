import { auth } from "@/app/api/auth/[...nextauth]/route";

import { gqlQery } from "@/config/grapql/graphql.config";
import { cleangqlResponse } from "@/utils/functions/ cleanGQLResponse";

import React from "react";
import PreviewDocumentPage from "../components";
import { getSingleUserDocument } from "@/utils/gql/document.gql";

interface Props {
    searchParams: any;
    params: any;
}
export const revalidate = 60;
const page = async ({ params }: Props) => {
    const session = await auth();
    const { id } = params;
    let template: any;

    try {
        // template = await gqlQery(getSingleTemplate(id), session?.jwt);
        const doc = await gqlQery(getSingleUserDocument(id), session?.jwt);

        const cleanResponse = cleangqlResponse(doc);

        template = cleanResponse?.userDocument?.data?.attributes;
    } catch (error) {}
    return <PreviewDocumentPage document={template} />;
};

export default page;
