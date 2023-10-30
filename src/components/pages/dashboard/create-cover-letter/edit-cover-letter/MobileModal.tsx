import Modal from "@/components/shared/Modal";
import { editCoverLetterSections } from "@/lib/contants";
import { TemplateSection } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
    openSection: boolean;
    setOpenSections: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentSection: React.Dispatch<React.SetStateAction<string>>;
    sections: TemplateSection[];
    currentTab: number;
    resumeSections: TemplateSection[];
}
const MobileModal = ({
    openSection,
    setOpenSections,
    setCurrentSection,
    sections,
    currentTab,
    resumeSections,
}: Props) => {
    return (
        <Modal>
            <div
                className={`fixed flex left-0 top-0 w-screen h-screen duration-700 ${
                    openSection ? "left-0" : "left-[-110%]"
                } items-start`}
            >
                <div className='bg-white h-full flex-1 py-[24px] flex flex-col justify-between'>
                    <div className='px-[24px] '>
                        <Image
                            priority
                            width={180}
                            height={26.92349}
                            src='/InstaLetter-logo.png'
                            alt='quick apply'
                        />
                        <div className=' lg:min-h-screen h-full lg:border-r-[1px]'>
                            <div className='mt-[32px]'>
                                <p
                                    className='max-w-[280px] px-[12px] w-full
                     text-base-secondary-text font-inter
                      text-[20px] leading-[30px] font-[600]'
                                >
                                    {currentTab === 0
                                        ? "Letter Sections"
                                        : "Resume Sections"}
                                </p>
                            </div>
                            {currentTab === 0 ? (
                                <div className='mt-[16px] gap-[4px]  grid'>
                                    {sections?.map((item) => (
                                        <Link
                                            onClick={() => {
                                                setCurrentSection(
                                                    item.sectionTitle
                                                );
                                                setOpenSections(false);
                                            }}
                                            href={`#${item.sectionTitle
                                                .split(" ")
                                                .join("-")}`}
                                            key={item.sectionTitle}
                                            className={`py-[10px] px-[12px] w-full rounded-[3px]
                              cursor-pointer text-[14px] leading-[20px] hover:bg-primary-yellow
                               hover:text-white focus:bg-primary-yellow focus:text-white font-[500] `}
                                        >
                                            {item.sectionTitle}
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className='mt-[16px] gap-[4px]  grid'>
                                    {resumeSections?.map((item) => (
                                        <Link
                                            onClick={() => {
                                                setCurrentSection(
                                                    item.sectionTitle
                                                );
                                                setOpenSections(false);
                                            }}
                                            href={`#${item.sectionTitle
                                                .split(" ")
                                                .join("-")}`}
                                            key={item.sectionTitle}
                                            className={`py-[10px] px-[12px] w-full rounded-[3px]
                              cursor-pointer text-[14px] leading-[20px] hover:bg-primary-yellow
                               hover:text-white focus:bg-primary-yellow focus:text-white font-[500] `}
                                        >
                                            {item.sectionTitle}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* <div>
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
                                    <Image
                                        width={40}
                                        height={40}
                                        src='/assets/images/dashboard/avatar-ai.png'
                                        alt=''
                                        className='rounded-full overflow-hidden'
                                    />
                                    <div className='leading-[20px] text-[14px] font-inter'>
                                        <h4 className='font-[500] '>
                                            John Doe
                                        </h4>
                                        <p className='font-[400]'>
                                            johdoe@gmail.com
                                        </p>
                                    </div>
                                </div>
                                <LuLogOut className='text-gray-500' size={20} />
                            </div>
                        </div>
                    </div> */}
                </div>
                x
                <div className='bg-gray-500 py-[12] h-full'>
                    <div
                        onClick={() => setOpenSections(false)}
                        className='p-8 cursor-pointer text-white'
                    >
                        <AiOutlineClose size={24} />
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default MobileModal;
