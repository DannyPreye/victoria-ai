"use client";
import React from "react";
import { LiaBellSolid } from "react-icons/lia";
import { LuLogOut } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

interface Props {
    setMinimizeSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardHeader = ({ setMinimizeSideBar }: Props) => {
    const router = useRouter();
    const { data: session } = useSession();

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
                <Link
                    href={"/dashboard/settings"}
                    className='w-[32px] h-[32px] rounded-full overflow-hidden relative'
                >
                    <Image
                        fill
                        src={
                            session?.user?.profile_picture ||
                            "https://agcnwo.com/wp-content/uploads/2020/09/avatar-placeholder.png"
                        }
                        alt={""}
                        className='object-contain'
                    />
                </Link>
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
