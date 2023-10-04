import React, { ReactNode } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
interface Props {
    children: ReactNode;
}
const layout = async ({ children }: Props) => {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/dashboard");
    }
    return <>{children}</>;
};

export default layout;
