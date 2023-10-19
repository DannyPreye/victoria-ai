"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import GetRoute from "@/components/pages/dashboard/GetRoute";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface Props {
    children: ReactNode;
}
const DashboardLayout = ({ children }: Props) => {
    const [minimizeSideBar, setMinimizeSideBar] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const jwt = Cookies.get("jwt-token");

    const checkEdit = pathname.includes("/dashboard/create-cover-letter/edit");

    return (
        <div className='flex lg:flex-row flex-col'>
            <Sidebar minimizeSideBar={minimizeSideBar} />
            {checkEdit ? (
                <div className='flex-1'>{children}</div>
            ) : (
                <div className='flex-1'>
                    <DashboardHeader setMinimizeSideBar={setMinimizeSideBar} />
                    <main className='lg:py-[38px]'>
                        <div className='px-[24px] '>
                            <GetRoute />
                        </div>
                        {children}
                    </main>
                </div>
            )}
        </div>
    );
};

export default DashboardLayout;
