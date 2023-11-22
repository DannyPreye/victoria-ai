import DashboardLayout from "@/layouts/DashboardLayout";
// import ColorProvider from "@/providers/ColorProvider";
import React, { ReactNode } from "react";

interface Props {
    children: ReactNode;
}
const layout = ({ children }: Props) => {
    return (
        <DashboardLayout>
            {/* <ColorProvider> */}
            {children}
            {/* </ColorProvider> */}
        </DashboardLayout>
    );
};

export default layout;
