"use client";
import React, { ReactNode, useState } from "react";
import GetRoute from "../../GetRoute";
import { editCoverLetterSections } from "@/lib/contants";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoMdTime } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbWorld } from "react-icons/tb";
import LetterContent from "./LetterContent";
import Link from "next/link";
import MobileModal from "./MobileModal";

const EditCoverLetterPage = () => {
    const [currentSection, setCurrentSection] = useState("");
    const [openSections, setOpenSections] = useState(false);
    const [openPublish, setOpenPublish] = useState(false);
    return (
        <div className='flex lg:flex-row flex-col '>
            <div className='lg:px-[16px] lg:py-[42px] lg:min-h-screen h-full lg:border-r-[1px]'>
                <div className='flex gap-[24px] px-[16px] py-[12px] lg:px-0 border-b-[1px] lg:border-b-0 items-center'>
                    <HiMenuAlt1
                        onClick={() => setOpenSections((prev) => !prev)}
                        size={24}
                        className='cursor-pointer lg:hidden'
                    />
                    <p
                        className='max-w-[280px] w-full
                     text-base-secondary-text font-inter
                      text-[20px] leading-[30px] font-[600]'
                    >
                        Letter Sections
                    </p>
                </div>
                <div className='mt-[24px]  py-[18px] hidden lg:grid'>
                    {editCoverLetterSections.map((item) => (
                        <Link
                            href={`#${item.split(" ").join("-")}`}
                            key={item}
                            onClick={() => setCurrentSection(item)}
                            className={`lg:max-w-[280px] w-full rounded-[3px]
                              cursor-pointer px-[12px]
                             text-[14px] leading-[20px] font-inter focus:text-white focus:bg-primary-yellow font-[500]
                              text-primary-gray-700 py-[10px]
                              ${
                                  currentSection == item
                                      ? "bg-primary-yellow text-white"
                                      : ""
                              }
                              `}
                        >
                            {item}
                        </Link>
                    ))}
                </div>
            </div>
            <div className='l flex-1'>
                <div className='lg:px-[24px]  lg:pt-[32px] '>
                    <GetRoute />
                </div>
                <div className='flex lg:px-[24px]  gap-[12px] lg:p-0 p-[16px] lg:pb-[32px] border-b-[1px] lg:border-none  lg:flex-row flex-col justify-between items'>
                    <h1
                        className='text-base-secondary-text
             lg:px-[0]   lg:py-0
            text-[20px] lg:text-[24px]
            font-[500] leading-[28.8px]'
                    >
                        Cover Letter Editor
                    </h1>

                    <div className='flex gap-[8px]  w-fit relative items-center'>
                        <IoMdTime size-={20} />
                        <PublishButton
                            title='Delete'
                            className='border-[1px] border-gray-300 text-gray-700'
                            Icon={<RiDeleteBinLine />}
                        />
                        <PublishButton
                            className='bg-base-primary-green text-white'
                            title='Publish'
                            Icon={<TbWorld />}
                            onClick={() => setOpenPublish((prev) => !prev)}
                        />
                        {openPublish && (
                            <div
                                style={{
                                    boxShadow:
                                        "0px 0px 1px 0px rgba(9, 30, 66, 0.31), 0px 3px 5px 0px rgba(9, 30, 66, 0.20)",
                                }}
                                className='w-[184px] bg-white grid gap-[12px] absolute bottom-[-215.20%] text-[#15294B] px-[16px] rounded-[3px] right-0'
                            >
                                <p className='py-[8px] text-[14px] leading-[140%] font-[400] '>
                                    Publish PDF
                                </p>
                                <p className='py-[8px] text-[14px] leading-[140%] font-[400] '>
                                    Publish to Word
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <LetterContent
                    setCurrentSection={setCurrentSection}
                    currentSection={currentSection}
                />
            </div>

            <MobileModal
                setCurrentSection={setCurrentSection}
                openSection={openSections}
                setOpenSections={setOpenSections}
            />
        </div>
    );
};

export default EditCoverLetterPage;

interface PublishButtonProps {
    Icon: ReactNode;
    title: string;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
const PublishButton = ({
    Icon,
    title,
    className,
    onClick,
}: PublishButtonProps) => {
    return (
        <button
            style={{
                boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
            }}
            className={`flex h-[40px] items-center gap-[8px]
     px-[18px] font-[500] text-[16px] rounded-[8px] leading-[24px]  ${className}`}
            onClick={onClick}
        >
            {Icon}
            {title}
        </button>
    );
};
