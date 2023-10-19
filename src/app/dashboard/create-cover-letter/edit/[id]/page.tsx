import { auth } from "@/app/api/auth/[...nextauth]/route";
import EditCoverLetterPage from "@/components/pages/dashboard/create-cover-letter/edit-cover-letter";
import { gqlQery } from "@/config/graphql.config";
import { getSingleTemplate, getUserDocumentById } from "@/lib/graphql-query";
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
        // template = await gqlQery(getSingleTemplate(id), session?.jwt);
        const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/document/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${session?.jwt}`,
                },
            }
        );
        template = data.data;
    } catch (error) {
        console.log("This is the error", error);
    }

    // if (!template?.template.data) {
    //     return notFound();
    // }

    return (
        <div>
            <EditCoverLetterPage
                id={template?.id}
                session={session as Session}
                template={template}
            />
        </div>
    );
};

export default page;
