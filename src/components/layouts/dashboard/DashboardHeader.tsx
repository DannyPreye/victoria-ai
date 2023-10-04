"use client";
import React from "react";
import { LiaBellSolid } from "react-icons/lia";
import { LuLogOut } from "react-icons/lu";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface Props {
    setMinimizeSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardHeader = ({ setMinimizeSideBar }: Props) => {
    const router = useRouter();
    return (
        <header className='lg:flex hidden items-center shadow-md justify-between py-[11px] px-[16px]'>
            <div
                onClick={() => setMinimizeSideBar((prev) => !prev)}
                className='p-[4px] cursor-pointer'
            >
                <img src='/assets/icons/menu-icon.png' alt='' />
            </div>

            <div className='flex items-center gap-[8px] text-gray-600'>
                <LiaBellSolid className='' size={24} />
                <div
                    style={{
                        background:
                            "url('/assets/images/dashboard/avatar-ai.png') no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                    }}
                    className='w-[32px] h-[32px] rounded-full'
                ></div>
                <LuLogOut
                    onClick={async () => {
                        // Cookies.remove("jwt-token");
                        await signOut();
                        router.push("/auth/sign-in");
                    }}
                    className='text-gray-500 cursor-pointer'
                    size={20}
                />
            </div>
        </header>
    );
};

export default DashboardHeader;
