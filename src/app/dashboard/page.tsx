import SelectTemplatePage from "@/components/pages/dashboard/select-template";
import React from "react";
import { auth } from "../api/auth/[...nextauth]/route";

export const revalidate = 60;
const page = async () => {
    const session = await auth();

    return (
        <div>
            <SelectTemplatePage />
        </div>
    );
};

export default page;
