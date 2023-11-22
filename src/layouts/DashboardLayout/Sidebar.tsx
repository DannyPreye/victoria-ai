"use client";
import Modal from "@/components/Modal.components";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { FiLifeBuoy } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useSelectedLayoutSegment } from "next/navigation";

const dashboardLinks = [
    {
        title: "Generate",
        icon: "/assets/icons/generate-icon.svg",
        link: "/dashboard",
    },
    {
        title: "My Documents",
        icon: "/assets/icons/text-snippet.png",
        link: "/dashboard/my-documents",
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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const segment = useSelectedLayoutSegment();

    const checkEdit = pathname.includes("/dashboard/create-cover-letter/edit");

    return (
        <aside
            className='lg:min-h-screen lg:w-fit flex justify-between
        items-center lg:block flex-shrink-0 bg-base-secondary-text py-[32px] px-[16px]'
        >
            <div className='flex  gap-2 items-center'>
                <Image
                    priority
                    width={31.928}
                    height={31.928}
                    src='/insta.png'
                    alt='insta apply'
                />
                {!minimizeSideBar || !checkEdit ? (
                    <Image
                        priority
                        width={110}
                        height={17.34}
                        src='/logo-text.png'
                        alt='insta apply'
                    />
                ) : (
                    ""
                )}
            </div>
            <div className='mt-[40.08px] hidden lg:grid '>
                {dashboardLinks.map((navLink, id) => (
                    <Link
                        href={navLink.link}
                        className={`p-[8px]  rounded-[3px] hover:bg-primary-yellow  flex gap-[12px] ${
                            navLink.link.includes(segment as string)
                                ? "bg-primary-yellow"
                                : ""
                        } items-center`}
                        key={id}
                    >
                        <img src={navLink.icon} alt='' />
                        {!minimizeSideBar || !checkEdit ? (
                            <span
                                className='text-white font-inter
                        text-[14px] font-[600] leading-[20px]'
                            >
                                {navLink.title}
                            </span>
                        ) : (
                            ""
                        )}
                    </Link>
                ))}
            </div>
            <div
                onClick={() => setIsMenuOpen(true)}
                className='lg:hidden cursor-pointer p-[4px] text-white rounded-[4px] bg-[rgba(255,255,255,0.10)]'
            >
                <BsGrid3X3GapFill size={24} />
            </div>
            <MobileMenu setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
        </aside>
    );
};

export default Sidebar;

interface MobileMenuProps {
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isMenuOpen: boolean;
}
const MobileMenu = ({ setIsMenuOpen, isMenuOpen }: MobileMenuProps) => {
    const router = useRouter();
    const { data: session } = useSession();
    const segment = useSelectedLayoutSegment();

    return (
        <Modal>
            <div
                className={`fixed flex left-0 top-0 w-screen h-screen duration-700 ${
                    isMenuOpen ? "left-0" : "left-[-110%]"
                } items-start`}
            >
                <div className='bg-base-secondary-text h-full flex-1 py-[24px] flex flex-col justify-between'>
                    <div className='px-[24px] '>
                        <Image
                            priority
                            width={180}
                            height={26.92349}
                            src='/InstaLetter-logo-white.png'
                            alt='quick apply'
                        />
                        <div className='mt-[42px] grid '>
                            {dashboardLinks.map((navLink, id) => (
                                <Link
                                    onClick={() => setIsMenuOpen(false)}
                                    href={navLink.link}
                                    className={`p-[8px] rounded-[3px] hover:bg-primary-yellow
                                     flex gap-[12px] items-center ${
                                         navLink.link.includes(
                                             segment as string
                                         )
                                             ? "bg-primary-yellow"
                                             : ""
                                     }`}
                                    key={id}
                                >
                                    <img src={navLink.icon} alt='' />

                                    <span
                                        className='text-white font-inter
                        text-[14px] font-[600] leading-[20px]'
                                    >
                                        {navLink.title}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className='px-[20px]'>
                            <Link
                                href={"/dashboard/notification"}
                                className='p-[8px] rounded-[3px] hover:bg-primary-yellow
                                     focus:bg-primary-yellow text-white  flex gap-[12px] items-center'
                            >
                                <FiLifeBuoy size={24} />
                                <span
                                    className='font-inter
                        text-[14px] font-[600] leading-[20px]'
                                >
                                    Notification
                                </span>
                            </Link>
                        </div>
                        <div className='px-[8px]'>
                            <div className='py-[24px] px-[8px] border-t-[1px] mt-[20px] flex  justify-between items-start'>
                                <div className='flex gap-[12px] items-center text-white'>
                                    <div className='w-[40px] h-[40px] rounded-full overflow-hidden '>
                                        <Image
                                            width={40}
                                            height={40}
                                            src={
                                                session?.user.profile_picture ||
                                                '/assets/images/dashboard/avatar-ai.png "https://agcnwo.com/wp-content/uploads/2020/09/avatar-placeholder.png'
                                            }
                                            alt={
                                                session?.user
                                                    .first_name as string
                                            }
                                            className='rounded-full overflow-hidden object-contain'
                                        />
                                    </div>
                                    <div className='leading-[20px] text-[14px] font-inter'>
                                        <h4 className='font-[500] '>
                                            {session?.user?.first_name}{" "}
                                            {session?.user.last_name}
                                        </h4>
                                        <p className='font-[400]'>
                                            {session?.user.email}
                                        </p>
                                    </div>
                                </div>
                                <LuLogOut
                                    onClick={async () => {
                                        await signOut();
                                        router.push("/auth/sign-in");
                                    }}
                                    className='text-gray-500'
                                    size={20}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-gray-500 py-[12] h-full'>
                    <div
                        onClick={() => setIsMenuOpen(false)}
                        className='p-8 cursor-pointer text-white'
                    >
                        <AiOutlineClose size={24} />
                    </div>
                </div>
            </div>
        </Modal>
    );
};
