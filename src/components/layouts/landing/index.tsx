import React, { ReactNode } from "react";
import Header from "./Header";

interface Props {
    children: ReactNode;
}
const LandingPageLayout = ({ children }: Props) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
};

export default LandingPageLayout;
