import { auth } from "@/app/api/auth/[...nextauth]/route";
import EditCoverLetterPage from "../components";
import { gqlQery } from "@/config/grapql/graphql.config";
import { cleangqlResponse } from "@/utils/functions/ cleanGQLResponse";

import { getSingleUserDocument } from "@/utils/gql/document.gql";

import { Session } from "next-auth";
import { notFound } from "next/navigation";
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
        const data = await gqlQery(getSingleUserDocument(id), session?.jwt);

        template = cleangqlResponse(data).userDocument;
    } catch (error) {
        console.log("This is the error", error);
    }

    return (
        <div>
            <EditCoverLetterPage
                id={id}
                session={session as Session}
                data={template?.data?.attributes}
            />
        </div>
    );
};

export default page;
