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
        <div className='flex'>
            <Sidebar minimizeSideBar={minimizeSideBar} />
            <div className='flex-1'>
                <DashboardHeader setMinimizeSideBar={setMinimizeSideBar} />
                <main className='px-[24px] py-[38px]'>
                    <GetRoute />
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
