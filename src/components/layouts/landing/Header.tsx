import Button from "@/components/shared/Button";
import { navMenu } from "@/lib/contants";
import Link from "next/link";
import React from "react";
import { BsChevronDown } from "react-icons/bs";

const Header = () => {
    return (
        <div
            className='container mx-auto p-[16px] flex items-center justify-between
         lg:px-[64px] lg:py-[26px]'
        >
            <img src='/quick-apply-ai-logo.svg' alt='quick apply ai' />
            <div
                className=' hidden lg:flex gap-[32px] items-center
            text-[16px] leading-[24px] text-gray-700 font-poppins'
            >
                {navMenu.map((nav) => (
                    <>
                        {nav.link ? (
                            <Link href={nav.link}>{nav.title}</Link>
                        ) : (
                            <div className='flex  items-center gap-[8px] cursor-pointer'>
                                <span>{nav.title}</span>
                                <BsChevronDown size={20} />
                            </div>
                        )}
                    </>
                ))}
            </div>
            <div className='flex items-center gap-[12px]'>
                <Button title='Login' isTransparent />
                <Button title='Get Started'  />
            </div>
        </div>
    );
};

export default Header;
