import { auth } from "@/app/api/auth/[...nextauth]/route";
import MyCoverLetterPage from "@/components/pages/dashboard/my-cover-letters";
import axios from "axios";
import React from "react";

export const revalidate = 60;
const page = async () => {


    return (
        <div>
            <MyCoverLetterPage />
        </div>
    );
};

export default page;
