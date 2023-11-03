import React, { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
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
