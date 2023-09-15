import DashboardHeading from "@/components/shared/DashboardHeading";
import Link from "next/link";
import React, { ReactNode } from "react";

const settingRoutes = [
    {
        title: "Your Details",
        link: "/dashboard/settings",
    },
    {
        title: "Preferences",
        link: "/dashboard/settings/preferences",
    },
    {
        title: "Security",
        link: "/dashboard/settings/security",
    },
];

interface Props {
    children: ReactNode;
}

const layout = ({ children }: Props) => {
    return (
        <div>
            <DashboardHeading title='Account Details' />
            <div className='mt-[36px]  lg:px-[24px] px-[16px] items-start flex lg:flex-row flex-col gap-[24px]'>
                <div className='flex lg:flex-col'>
                    {settingRoutes.map((route) => (
                        <Link
                            key={route.title}
                            href={route.link}
                            className='h-[56px] flex flex-col justify-center p-[16px]
                            lg:w-[233px] focus:border-b-[4px] lg:focus:border-l-[4px] focus:font-[600] font-[400]
                            font-inter text-[16px] lg:focus:border-b-0 leading-[24px] text-base-secondary-text
                             border-primary-yellow'
                        >
                            {route.title}
                        </Link>
                    ))}
                </div>
                <div className='flex-1 '>{children}</div>
            </div>
        </div>
    );
};

export default layout;
