import { auth } from "@/app/api/auth/[...nextauth]/route";
import PreviewDocumentPage from "@/components/pages/dashboard/my-cover-letters/Preview";
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
    return <PreviewDocumentPage document={template} />;
};

export default page;
