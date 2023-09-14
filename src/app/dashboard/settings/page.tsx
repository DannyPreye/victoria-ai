import Image from "next/image";
import React from "react";
import { ImPencil } from "react-icons/im";

const page = () => {
    return (
        <div>
            <div className='flex justify-between'>
                <div className='text-base-secondary-text'>
                    <h1 className='font-[600] text-[30px] leading-[42px]  '>
                        Your Details
                    </h1>
                    <p className='font-inter text-[14px] leading-[20px] font-[400]'>
                        Lorem ipsum dolor sit ametis ipsum dolor sit ametis
                    </p>
                </div>
                <button
                    style={{
                        boxShadow: "0px 1px 2px 0px rgba(43, 37, 17, 0.05)",
                    }}
                    className=' p-[16px] rounded-[8px] border-neutrals-500
                flex gap-[8px] border-[1px] bg-white items-center w-[86px] '
                >
                    <ImPencil />
                    <span>Edit</span>
                </button>
            </div>
            <div className='mt-[48px] flex items-center gap-[54px]'>
                <Image
                    width={160}
                    height={160}
                    src='/assets/images/dashboard/tim-cook-avatar.png'
                    alt=''
                    className='rounded-[8px] overflow-hidden'
                />
                <div className='grid gap-[16px]'>
                    <h3 className='text-[24px] font-[600] leading-[28.8px]'>
                        Tim Cook
                    </h3>
                    <p className='font-inter text-[18px] leading-[28px] font-[400]'>
                        usernamem@mail.com
                    </p>
                </div>
            </div>
        </div>
    );
};

export default page;
