import { auth } from "@/app/api/auth/[...nextauth]/route";
import EditCoverLetterPage from "@/components/pages/dashboard/create-cover-letter/edit-cover-letter";
import { gqlQery } from "@/config/graphql.config";
import { cleangqlResponse } from "@/lib/functions/cleanGqlResponse";
import {
    getSingleTemplate,
    getSingleUserDocument,
    getTemplates,
    getUserDocumentById,
} from "@/lib/graphql-query";
import { TemplateData } from "@/lib/types";
import axios from "axios";
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

        console.log(cleangqlResponse(data));
        template = cleangqlResponse(data).userDocument;
        console.log(template);
    } catch (error) {
        console.log("This is the error", error);
    }

    // if (!template?.template.data) {
    //     return notFound();
    // }

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
