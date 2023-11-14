import { auth } from "@/app/api/auth/[...nextauth]/route";
import MyCoverLetterPage from "@/components/pages/dashboard/my-cover-letters";
import { gqlQery } from "@/config/graphql.config";
import { getUserDocuments } from "@/lib/graphql-query";
import axios from "axios";
import React from "react";

export const revalidate = 60;
const page = async () => {
    const session = await auth();

    return (
        <div>
            <MyCoverLetterPage />
        </div>
    );
};

export default page;
