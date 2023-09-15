"use client";
import React, { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import GetRoute from "@/components/pages/dashboard/GetRoute";

interface Props {
    children: ReactNode;
}
const DashboardLayout = ({ children }: Props) => {
    const [minimizeSideBar, setMinimizeSideBar] = useState(false);
    return (
        <div className='flex lg:flex-row flex-col'>
            <Sidebar minimizeSideBar={minimizeSideBar} />
            <div className='flex-1'>
                <DashboardHeader setMinimizeSideBar={setMinimizeSideBar} />
                <main className='lg:py-[38px]'>
                    <div className='px-[24px] '>
                        <GetRoute />
                    </div>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
