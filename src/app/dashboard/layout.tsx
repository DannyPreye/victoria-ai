import DashboardLayout from "@/components/layouts/dashboard";
import React, { ReactNode } from "react";

interface Props {
    children: ReactNode;
}
const layout = ({ children }: Props) => {
    return <DashboardLayout>{children}</DashboardLayout>;
};

export default layout;
