"use client";
import { Session } from "next-auth";
import Image from "next/image";
import { useState } from "react";
import { ImPencil } from "react-icons/im";
import { EditDetailsModal } from "./EditDetailsModal";
import { useSession } from "next-auth/react";

interface Props {
    session: Session | null;
}
const UserDetailsPage = ({}: Props) => {
    const [openEdit, setOpenEdit] = useState(false);
    const { data: session } = useSession();

    return (
        <div>
            <div className='flex flex-col gap-[24px] lg:flex-row lg:justify-between'>
                <div className='text-base-secondary-text'>
                    <h1 className='font-[600] text-[30px] leading-[42px]  '>
                        Your Details
                    </h1>
                    <p className='font-inter text-[14px] leading-[20px] font-[400]'>
                        Lorem ipsum dolor sit ametis ipsum dolor sit ametis
                    </p>
                </div>
                <button
                    onClick={() => setOpenEdit(true)}
                    style={{
                        boxShadow: "0px 1px 2px 0px rgba(43, 37, 17, 0.05)",
                    }}
                    className=' p-[16px] rounded-[8px] border-neutrals-500
                flex gap-[8px] text-[14px] font-[500] leading-[120%] border-[1px] bg-white items-center w-[86px] '
                >
                    <ImPencil />
                    <span>Edit</span>
                </button>
            </div>
            <div className='mt-[48px] flex items-center gap-[54px]'>
                <Image
                    width={160}
                    height={160}
                    src={
                        session?.user?.profile_picture ||
                        "https://agcnwo.com/wp-content/uploads/2020/09/avatar-placeholder.png"
                    }
                    alt={session?.user?.first_name || "user profile"}
                    className='rounded-[8px] object-contain overflow-hidden'
                />
                <div className='grid gap-[16px]'>
                    <h3 className='text-[24px] font-[600] leading-[28.8px]'>
                        {session?.user?.first_name} {session?.user?.last_name}
                    </h3>
                    <p className='font-inter text-[18px] leading-[28px] font-[400]'>
                        {session?.user?.email}
                    </p>
                </div>
            </div>
            <EditDetailsModal
                session={session}
                setOpenEdit={setOpenEdit}
                openEdit={openEdit}
            />
        </div>
    );
};

export default UserDetailsPage;
