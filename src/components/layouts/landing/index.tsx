"use client";
import React, { ReactNode } from "react";
import Header from "./Header";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

interface Props {
    children: ReactNode;
}

const LandingPageLayout = ({ children }: Props) => {
    const pathname = usePathname();
    console.log(
        "This is the pathname",
        !pathname.includes("/dashboard"),
        !pathname.includes("/auth"),
        pathname
    );
    return (
        <>
            {/* This layout is only effective on the landing pages and not on other pages */}
            {pathname.includes("/dashboard") || pathname.includes("/auth") ? (
                ""
            ) : (
                <div className=' bg-gray-50'>
                    <Header />
                </div>
            )}
            {children}

            {pathname.includes("/dashboard") || pathname.includes("/auth") ? (
                ""
            ) : (
                <div className=' bg-gray-50'>
                    <Footer />
                </div>
            )}
        </>
    );
};

export default LandingPageLayout;
