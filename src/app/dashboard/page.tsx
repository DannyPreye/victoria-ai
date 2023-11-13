import SelectTemplatePage from "@/components/pages/dashboard/select-template";
import React from "react";

export const revalidate = 60;

const page = async () => {
    return (
        <div>
            <SelectTemplatePage />
        </div>
    );
};

export default page;
