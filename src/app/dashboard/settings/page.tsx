import React from "react";
;
import { getServerSession } from "next-auth";
import UserDetailsPage from "@/components/pages/dashboard/setting/UserDetailsPage";
import { authOptions } from "@/lib/auth";

const page = async () => {
    const session = await getServerSession(authOptions);

    return <UserDetailsPage session={session} />;
};

export default page;
