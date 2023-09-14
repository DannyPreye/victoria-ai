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
            <h1 className='font-[500] leading-[28.8px] text-[24px] text-base-secondary-text'>
                Account Details
            </h1>
            <div className='mt-[36px] items-start flex gap-[24px]'>
                <div className='grid'>
                    {settingRoutes.map((route) => (
                        <Link
                            key={route.title}
                            href={route.link}
                            className='h-[56px] flex flex-col justify-center p-[16px]
                            w-[233px] focus:border-l-[4px] focus:font-[600] font-[400]
                            font-inter text-[16px] leading-[24px] text-base-secondary-text
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
