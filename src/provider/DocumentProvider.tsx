"use client";
import TemplateContextProvider from "@/contexts/TemplateContext";
import React, { ReactNode } from "react";

interface Props {
    children: ReactNode;
}
const DocumentProvider = ({ children }: Props) => {
    return (
        <div>
            <TemplateContextProvider>{children}</TemplateContextProvider>
        </div>
    );
};

export default DocumentProvider;
