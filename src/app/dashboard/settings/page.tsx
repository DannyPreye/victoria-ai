import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import UserDetailsPage from "@/components/pages/dashboard/setting/UserDetailsPage";

const page = async () => {
    const session = await getServerSession(authOptions);

    return <UserDetailsPage session={session} />;
};

export default page;
