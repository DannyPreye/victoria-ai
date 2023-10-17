import { auth } from "@/app/api/auth/[...nextauth]/route";
import EditCoverLetterPage from "@/components/pages/dashboard/create-cover-letter/edit-cover-letter";
import { gqlQery } from "@/config/graphql.config";
import { getSingleTemplate } from "@/lib/graphql-query";
import { TemplateData } from "@/lib/types";
import React from "react";

interface Props {
    searchParams: any;
    params: any;
}
const page = async ({ params }: Props) => {
    const { id } = params;
    let template: TemplateData | undefined;
    const session = await auth();

    // if (session) {
    //     template = await gqlQery(
    //         getSingleTemplate(params as string),
    //         session.jwt
    //     );
    // }
    // console.log(template);

    return (
        <div>
            <EditCoverLetterPage />
        </div>
    );
};

export default page;
