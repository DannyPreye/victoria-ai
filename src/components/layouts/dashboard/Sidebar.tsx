import Link from "next/link";
import React from "react";

const dashboardLinks = [
    {
        title: "Cover Letters",
        icon: "/assets/icons/dashboard.png",
        link: "/dashboard/cover-letter",
    },
    {
        title: "My Cover Letters",
        icon: "/assets/icons/text-snippet.png",
        link: "/dashboard/my-cover-letters",
    },
    {
        title: "Settings",
        icon: "/assets/icons/settings.png",
        link: "/dashboard/settings",
    },
];

interface Props {
    minimizeSideBar: boolean;
}
const Sidebar = ({ minimizeSideBar }: Props) => {
    return (
        <aside className='min-h-screen w-fit flex-shrink-0 bg-base-secondary-text py-[32px] px-[16px]'>
            <img src='/dashboard-logo.png' alt='quick apply' />
            <div className='mt-[40.08px] grid '>
                {dashboardLinks.map((navLink, id) => (
                    <Link
                        href={navLink.link}
                        className='p-[8px] rounded-[3px] hover:bg-primary-yellow focus:bg-primary-yellow flex gap-[12px] items-center'
                        key={id}
                    >
                        <img src={navLink.icon} alt='' />
                        {!minimizeSideBar && (
                            <span
                                className='text-white font-inter
                        text-[14px] font-[600] leading-[20px]'
                            >
                                {navLink.title}
                            </span>
                        )}
                    </Link>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;
