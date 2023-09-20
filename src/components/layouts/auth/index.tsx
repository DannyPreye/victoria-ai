"use client";
import Image from "next/image";
import React, { ReactNode } from "react";
import { AiOutlineMail } from "react-icons/ai";
import AuthCarousel from "./AuthCarousel";

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
            <div className='bg-white  p-[16px] lg:p-[32px] w-full lg:w-[50%] min-h-screen flex flex-col justify-between '>
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
            <AuthCarousel slides={slides} />
        </div>
    );
};

export default AuthLayout;
