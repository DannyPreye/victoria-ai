import DashboardLayout from "@/layouts/DashboardLayout";
import DocumentProvider from "@/provider/DocumentProvider";
// import ColorProvider from "@/providers/ColorProvider";
import React, { ReactNode } from "react";

interface Props {
    children: ReactNode;
}
const layout = ({ children }: Props) => {
    return (
        <DocumentProvider>
            <DashboardLayout>
                {/* <ColorProvider> */}
                {children}
                {/* </ColorProvider> */}
            </DashboardLayout>
        </DocumentProvider>
    );
};

export default layout;
