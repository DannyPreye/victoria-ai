import Button from "@/components/shared/Button";
import { navMenu } from "@/lib/contants";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BsChevronDown, BsGrid3X3GapFill } from "react-icons/bs";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <div
            className='container py-[12px] px-[16px] mx-auto p-[16px] flex items-center justify-between
         lg:px-[64px]  lg:py-[26px]'
        >
            <Image
                width={207}
                height={40}
                src='/InstaLetter-logo.png'
                priority
                alt='quick apply ai'
            />
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
            <div className='hidden lg:flex items-center gap-[12px]'>
                <Link href={"/auth/sign-in"}>
                    <Button title='Login' variant='outline' />
                </Link>
                <Link href={"/auth/sign-up"}>
                    <Button variant='filled' title='Get Started' />
                </Link>
            </div>
            <div
                onClick={() => setIsMenuOpen(true)}
                className='lg:hidden cursor-pointer p-[4px] text-base-secondary-text rounded-[4px] bg-[rgba(7,36,0,0.10)]'
            >
                <BsGrid3X3GapFill size={24} />
            </div>
        </div>
    );
};

export default Header;
