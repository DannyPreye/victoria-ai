import { auth } from "@/app/api/auth/[...nextauth]/route";
import EditCoverLetterPage from "@/components/pages/dashboard/create-cover-letter/edit-cover-letter";
import { gqlQery } from "@/config/graphql.config";
import { getSingleTemplate } from "@/lib/graphql-query";
import { TemplateData } from "@/lib/types";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
    searchParams: any;
    params: any;
}
export const revalidate = 60;

const page = async ({ params }: Props) => {
    const { id } = params;
    let template: any;
    const session = await auth();

    try {
        template = await gqlQery(getSingleTemplate(id), session?.jwt);
    } catch (error) {
        console.log("This is the error", error);
    }

    if (!template?.template.data) {
        return notFound();
    }
    return (
        <div>
            <EditCoverLetterPage template={template.template.data} />
        </div>
    );
};

export default page;
