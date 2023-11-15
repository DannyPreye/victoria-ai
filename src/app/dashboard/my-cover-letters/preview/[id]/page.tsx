import { auth } from "@/app/api/auth/[...nextauth]/route";
import PreviewDocumentPage from "@/components/pages/dashboard/my-cover-letters/Preview";
import { gqlQery } from "@/config/graphql.config";
import { cleangqlResponse } from "@/lib/functions/cleanGqlResponse";
import { getSingleUserDocument } from "@/lib/graphql-query";
import axios from "axios";
import React from "react";

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
        console.log(cleanResponse);
        template = cleanResponse?.userDocument?.data?.attributes;
    } catch (error) {
        console.log("This is the error", error);
    }
    return <PreviewDocumentPage document={template} />;
};

export default page;
