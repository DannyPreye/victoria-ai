"use client";
import React, { useState, useContext, useEffect } from "react";
import GetRoute from "../../GetRoute";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoMdTime } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbWorld } from "react-icons/tb";
import LetterContent from "./LetterContent";
import Link from "next/link";
import MobileModal from "./MobileModal";
import axios from "axios";
import { Session } from "next-auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { DeleteModal } from "./DeleteModal";
import { PublishButton } from "./PublishButton";
import { EditorTab } from "./EditorTab";
import { BiPlus } from "react-icons/bi";
import AddMoreSectionsModal from "./AddMoreSectionsModal";
import ResumeContent from "./ResumeContent";
import { documentContext } from "@/contexts/ColorContext";
import { GrFormCheckmark } from "react-icons/gr";
import { isArray } from "@apollo/client/utilities";
import { AddPhotoSwitch } from "./AddPhotoSwitch";
import { FaUser } from "react-icons/fa6";
import Image from "next/image";

interface Props {
    data: any;
    id: string;
    session: Session;
}
const EditCoverLetterPage = ({ data, id, session }: Props) => {
    const [currentSection, setCurrentSection] = useState("");
    const [openSections, setOpenSections] = useState(false);
    const [openPublish, setOpenPublish] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const router = useRouter();
    const [currentTab, setCurrentTab] = useState(0);
    const [moreSectionModal, setMoreSectionModal] = useState(false);
    const [addProfilePics, setAddProfilePics] = useState<boolean>(
        data?.attributes?.addProfilePicture || false
    );
    const {
        handleChangeColor,
        handleAllResumeSections,
        resumeSections,
        currentColor,
    } = useContext(documentContext);

    const colors = [
        "#000000",
        "#0a3f86",
        "#6ab3e4",
        "#609f82",
        "#404564",
        "#800020",
    ];

    console.log(data);

    const handleDeleteCoverLetter = async () => {
        const res = await toast.promise(
            axios.delete(
                `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/user-documents/${id}`,
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

    useEffect(() => {
        handleAllResumeSections(data?.template?.resume?.sections);
    }, []);

    return (
        <div className='flex lg:flex-row flex-col '>
            {currentTab == 0 ? (
                <SectionsMenu
                    setCurrentSection={setCurrentSection}
                    setOpenSections={setOpenSections}
                    currentTab={currentTab}
                    sections={
                        typeof data?.template?.coverLetter?.sections ===
                        "object"
                            ? Object?.keys(
                                  data?.template?.coverLetter?.sections
                              )
                            : []
                    }
                    currentSection={currentSection}
                />
            ) : (
                <>
                    <SectionsMenu
                        setCurrentSection={setCurrentSection}
                        setOpenSections={setOpenSections}
                        currentTab={currentTab}
                        sections={
                            typeof resumeSections === "object"
                                ? Object.keys(resumeSections).filter(
                                      (item) => item !== "otherSections"
                                  )
                                : []
                        }
                        currentSection={currentSection}
                        setModalOpen={setMoreSectionModal}
                    />
                </>
            )}
            <div className=' flex-1'>
                <div className='lg:px-[24px] lg:pt-[32px] '>
                    <GetRoute />
                </div>
                <div className='flex lg:px-[24px]  gap-[12px] lg:p-0 p-[16px] lg:pb-[32px] border-b-[1px] lg:border-none  lg:flex-row flex-col justify-between items-start'>
                    <div className='flex-shrink-0'>
                        <h1
                            className='text-base-secondary-text
             lg:px-[0]   lg:py-0
            text-[20px] lg:text-[24px]
            font-[500] leading-[28.8px]'
                        >
                            Cover Letter Editor
                        </h1>
                        <button
                            onClick={() => router.push("/dashboard")}
                            className='bg-base-primary-green
                         text-white font-inter font-[600] leading-[20px]
                         flex items-start
                         text-[14px] rounded-[3px] my-[11px] px-[12px] py-[10px] w-full lg:w-[256px]'
                        >
                            Change Template
                        </button>
                        <div className='flex items-center gap-[5px] mt-[9px]'>
                            <p className='font-inter text-[14px] font-[500] leading-[20px]'>
                                Colors
                            </p>
                            <div className='flex items-center gap-[12px] '>
                                {colors.map((item, id) => (
                                    <button
                                        onClick={() => handleChangeColor(item)}
                                        style={{
                                            background: item,
                                            color: "white",
                                        }}
                                        key={id}
                                        className='w-[20px]  h-[20px] grid place-items-center rounded-full'
                                    >
                                        {item === currentColor && (
                                            <GrFormCheckmark color='white' />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <AddPhotoSwitch
                            setCheckProfilePics={setAddProfilePics}
                            checkProfilePics={addProfilePics}
                        />
                    </div>
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
                                <button className='py-[8px] text-[14px] leading-[140%] font-[400] '>
                                    Publish PDF
                                </button>
                                <button className='py-[8px] text-[14px] leading-[140%] font-[400] '>
                                    Publish to Word
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                {addProfilePics && (
                    <div className='grid place-items-center'>
                        <ProfilePicture
                            TemplateId=''
                            profilePicture={
                                data.profilePicture?.data?.attributes
                                    ?.url as string
                            }
                        />
                    </div>
                )}
                <div className='flex relative flex-col mt-[86px] lg:px-[24px] lg:py-[32px]  bg-gray-iron-50 py-[32px] px-[16px]  w-full'>
                    <div className='flex gap-[21px] px-[23px] justify-center absolute top-[-3%] left-0 w-full'>
                        {["COVER LETTER", "RESUME"].map((text, index) => (
                            <EditorTab
                                currentTab={currentTab}
                                setCurrentTab={setCurrentTab}
                                index={index}
                                text={text}
                                key={index}
                            />
                        ))}
                    </div>
                    {
                        [
                            <LetterContent
                                key={"Cover Letter"}
                                setCurrentSection={setCurrentSection}
                                currentSection={currentSection}
                                sections={data?.template?.coverLetter?.sections}
                            />,
                            <ResumeContent
                                key={"Resume"}
                                setCurrentSection={setCurrentSection}
                                currentSection={currentSection}
                                sections={resumeSections}
                                setOpenModal={setMoreSectionModal}
                            />,
                        ][currentTab]
                    }
                </div>
            </div>
            {/*
            <MobileModal
                currentTab={currentTab}
                sections={data?.attributes?.template.coverLetter.sections}
                resumeSections={resumeSections}
                setCurrentSection={setCurrentSection}
                openSection={openSections}
                setOpenSections={setOpenSections}
            /> */}
            {openModal && (
                <DeleteModal
                    isModalOpen={openModal}
                    projectName={data?.attributes?.title}
                    handleDelete={handleDeleteCoverLetter}
                    setIsModalOpen={setOpenModal}
                />
            )}

            {/* {moreSectionModal && (
                <AddMoreSectionsModal
                    setIsModalOpen={setMoreSectionModal}
                    isModalOpen={moreSectionModal}
                />
            )} */}
        </div>
    );
};

export default EditCoverLetterPage;

interface SectionsMenuProps {
    sections: any[];
    currentSection: string;
    setCurrentSection: React.Dispatch<React.SetStateAction<string>>;
    setOpenSections: React.Dispatch<React.SetStateAction<boolean>>;
    setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    currentTab: number;
}
const SectionsMenu = ({
    sections,
    currentSection,
    setCurrentSection,
    setOpenSections,
    currentTab,
    setModalOpen,
}: SectionsMenuProps) => {
    const splitWord = (word: string) =>
        word.replace(/([a-z])([A-Z])/g, "$1 $2");
    return (
        <div className='lg:px-[16px] lg:py-[42px] h-full lg:border-r-[1px]'>
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
                    {currentTab === 0 ? "Letter" : "Resume"} Sections
                </p>
            </div>
            <div className='mt-[24px]  py-[18px] hidden lg:grid'>
                {sections?.map((item: any, id) => (
                    <Link
                        href={`#${item}`}
                        key={item}
                        onClick={() => setCurrentSection(item)}
                        className={`lg:max-w-[280px] w-full capitalize rounded-[3px]
                              cursor-pointer px-[12px]
                             text-[14px] leading-[20px]  font-inter focus:text-white focus:bg-primary-yellow font-[500]
                              text-primary-gray-700 py-[10px]
                              ${
                                  currentSection == item
                                      ? "bg-primary-yellow text-white"
                                      : ""
                              }
                              `}
                    >
                        {item === "heading"
                            ? "Heading/Contact Information"
                            : currentTab == 1
                            ? splitWord(item)
                            : item.replace(/_/g, " ")}
                    </Link>
                ))}
            </div>
            {currentTab == 1 && (
                // <Button title='Add Sections' Icon={<BiPlus />} />
                <button
                    onClick={() => setModalOpen && setModalOpen(true)}
                    className='w-full lg:flex hidden uppercase gap-2 max-w-[280px] h-[40px] text-[14px] leading-[20px] text-center font-inter font-[600] bg-base-primary-green rounded-[3px] text-white   items-center justify-center'
                >
                    <BiPlus /> <span>Add Sections</span>
                </button>
            )}
        </div>
    );
};

interface ProfilePictureProps {
    profilePicture: string;
    TemplateId: string;
}

const ProfilePicture = ({
    profilePicture,
    TemplateId,
}: ProfilePictureProps) => {
    return (
        <div className='flex flex-col items-center gap-3'>
            <div className='w-[80px] h-[80px] grid place-items-center rounded-full relative bg-gray-400 border-5 border-gray-600'>
                {profilePicture ? (
                    <Image src={profilePicture} alt='' fill />
                ) : (
                    <FaUser size={40} />
                )}
            </div>
            <p className='text-semibold text-gray-600'>
                Upload profile picture
            </p>
        </div>
    );
};
