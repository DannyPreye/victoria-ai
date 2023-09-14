import React from "react";
import { LiaBellSolid } from "react-icons/lia";
interface Props {
    setMinimizeSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}
const DashboardHeader = ({ setMinimizeSideBar }: Props) => {
    return (
        <header className='flex items-center shadow-md justify-between py-[11px] px-[16px]'>
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
            </div>
        </header>
    );
};

export default DashboardHeader;
