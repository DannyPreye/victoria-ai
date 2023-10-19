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
import { TemplateData } from "@/lib/types";
import axios from "axios";
import { Session } from "next-auth";
import { toast } from "react-toastify";
import { FaLaptopHouse } from "react-icons/fa";
import Modal from "@/components/shared/Modal";
import Button from "@/components/pages/auth/Shared/Button";
import { useRouter } from "next/navigation";

interface Props {
    template: any;
    id: string;
    session: Session;
}
const EditCoverLetterPage = ({ template: data, id, session }: Props) => {
    const [currentSection, setCurrentSection] = useState("");
    const [openSections, setOpenSections] = useState(false);
    const [openPublish, setOpenPublish] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const router = useRouter();

    const handleDeleteCoverLetter = async () => {
        const res = await toast.promise(
            axios.delete(
                `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/document/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${session.jwt}`,
                    },
                }
            ),
            {
                pending: "Deleting your document",
                success: "Deleted",
                error: "Something went wrong",
            }
        );

        if (res?.data?.status) {
            router.push(`/dashboard/my-cover-letters`);
        }
    };

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
                    {data?.template.coverLetter.section?.map((item: any) => (
                        <Link
                            href={`#${item.title.split(" ").join("-")}`}
                            key={item.title}
                            onClick={() => setCurrentSection(item?.title)}
                            className={`lg:max-w-[280px] w-full rounded-[3px]
                              cursor-pointer px-[12px]
                             text-[14px] leading-[20px] font-inter focus:text-white focus:bg-primary-yellow font-[500]
                              text-primary-gray-700 py-[10px]
                              ${
                                  currentSection == item?.title
                                      ? "bg-primary-yellow text-white"
                                      : ""
                              }
                              `}
                        >
                            {item.title}
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
                            onClick={() => setOpenModal(true)}
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
                    sections={data?.template.coverLetter.section}
                />
            </div>

            <MobileModal
                sections={data?.template.coverLetter.section}
                setCurrentSection={setCurrentSection}
                openSection={openSections}
                setOpenSections={setOpenSections}
            />
            {openModal && (
                <DeleteModal
                    isModalOpen={openModal}
                    projectName={data?.title}
                    handleDelete={handleDeleteCoverLetter}
                    setIsModalOpen={setOpenModal}
                />
            )}
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

interface DeleteModalProps {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isModalOpen: boolean;
    handleDelete: () => void;
    projectName: string;
}
const DeleteModal = ({
    isModalOpen,
    setIsModalOpen,
    handleDelete,
    projectName,
}: DeleteModalProps) => {
    return (
        <Modal>
            <div
                onClick={() => setIsModalOpen(false)}
                className={`fixed top-0 left-0 lg:px-[58px] flex-col flex items-center justify-center
                h-screen w-screen backdrop-blur-sm bg-[rgba(141,172,216,0.25)] ${
                    isModalOpen ? "block" : "hidden"
                }`}
            >
                <div className='bg-white py-3 grid gap-4 px-4 rounded-md h-[240px] max-w-[450px] w-[90%]'>
                    <p className='text-center font-semibold font-inter'>
                        Are you sure you want to delete {projectName}?
                    </p>
                    <div className='flex justify-between gap-4 items-center'>
                        <Button
                            title='Cancel'
                            onClick={() => setIsModalOpen(false)}
                        />
                        <Button
                            title='Delete'
                            className='bg-red-400'
                            onClick={handleDelete}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
};
