import React from "react";
import UserDetailsPage from "./components";
import { auth } from "@/app/api/auth/[...nextauth]/route";

const page = async () => {
    const session = await auth();

    return <UserDetailsPage session={session} />;
};

export default page;
