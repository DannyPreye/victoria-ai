import React, { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "../api/auth/[...nextauth]/route";

interface Props {
    children: ReactNode;
}
const layout = async ({ children }: Props) => {
    const session = await auth();

    if (session) {
        redirect("/dashboard");
    }
    return <>{children}</>;
};

export default layout;
