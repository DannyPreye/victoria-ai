import SelectTemplatePage from "@/components/pages/dashboard/select-template";
import { gqlQery } from "@/config/graphql.config";
import React from "react";
import { auth } from "../api/auth/[...nextauth]/route";
import { getUserDocuments } from "@/lib/graphql-query";

export const revalidate = 60;

const page = async () => {
    return (
        <div>
            <SelectTemplatePage />
        </div>
    );
};

export default page;
