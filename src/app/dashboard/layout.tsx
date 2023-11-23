import TemplateContextProvider from "@/contexts/TemplateContext";
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
      <TemplateContextProvider>{children}</TemplateContextProvider>
      {/* </ColorProvider> */}
    </DashboardLayout>
  );
};

export default layout;
