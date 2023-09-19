"use client";
import Image from "next/image";
import React, { ReactNode } from "react";
import { AiOutlineMail } from "react-icons/ai";

interface Props {
    children: ReactNode;
    slides: {
        image: string;
        title: string;
        paragraph: string;
    }[];
}
const AuthLayout = ({ children, slides }: Props) => {
    return (
        <div className='flex'>
            <div className='bg-white  p-[16px] lg:p-[32px] lg:w-[50%] min-h-screen flex flex-col justify-between '>
                <div className='lg:p-[32px] p-[16px] mb-[32px] lg:mb-0 flex justify-center lg:justify-start '>
                    <Image
                        alt='instaletter'
                        src='/InstaLetter-logo.png'
                        width={207}
                        height={40}
                    />
                </div>
                {children}
                <div className='flex text-[14px] font-[400] leading-[20px] font-inter text-gray-600 justify-between items-center mt-[32px]'>
                    <span>©2023 QuickApplyAI</span>
                    <div className='flex gap-[8px] items-center'>
                        <AiOutlineMail />
                        <span>help@QuickApplyAi.com</span>
                    </div>
                </div>
            </div>
            <div
                className='hidden lg:flex flex-col
            justify-center px-[32px] items-center
             lg:w-[50%]  bg-gray-iron-50'
            >
                <Image src={slides[0].image} alt='' width={442} height={300} />
                <h3 className='leading-[140%] mt-[32px] text-[36px] font-[600] text-base-secondary-text'>
                    {slides[0].title}
                </h3>
                <p className='text-center max-w-[444px] w-full mt-[20px] leading-[28px] font-[500] text-[18px] text-gray-iron-600'>
                    {slides[0].paragraph}
                </p>

                <div className='flex mt-[72px] justify-center max-w-[444px] w-full  items-center gap-[12px]'>
                    {[1, 2, 3, 4, 5].map((indicator, id) => (
                        <span
                            key={id}
                            className={` ${
                                indicator == 1
                                    ? "bg-primary-yellow"
                                    : "bg-gray-300"
                            } w-[10px] h-[10px] rounded-full`}
                        ></span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
