"use client";
import { TemplateSection } from "@/lib/types";
import React, { useContext, useEffect, useState } from "react";
import { EditButtons } from "./EditButtons";
import { documentContext } from "@/contexts/ColorContext";
import { BiPlus } from "react-icons/bi";

interface Props {
    currentSection: string;
    setCurrentSection: React.Dispatch<React.SetStateAction<string>>;
    sections: any;
    setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
}
const ResumeContent = ({
    currentSection,
    setCurrentSection,
    sections,
    setOpenModal,
}: Props) => {
    const { currentColor } = useContext(documentContext);

    const extractSectionHeading =
        typeof sections === "object" ? Object.keys(sections) : [];

    console.log(sections);
    return (
        <div className='mx-auto w-full lg:w-[778px] '>
            <div className='pt-[12px] grid gap-[12px] mb-[29px] border-b-[2px] border-b-gray-iron-200 pb-[28px]'>
                <h2
                    style={{ color: currentColor }}
                    className='text-[30px] uppercase font-[600]  leading-[140%]'
                >
                    {sections["heading"].username}
                </h2>
                <p className='text-base-secondary-text font-inter text-[20px] font-[500] leading-[30px]'>
                    {sections["heading"]?.professionalTitle}
                </p>
            </div>

            <div className='grid gap-[12px]'>
                {extractSectionHeading.slice(1)?.map((title, id) => (
                    <>
                        {title !== "otherSections" && (
                            <SectionControl
                                currentSection={currentSection}
                                section={sections[title]}
                                key={id}
                                sectionTitle={title}
                            />
                        )}
                    </>
                ))}
            </div>

            <button
                onClick={() => setOpenModal && setOpenModal(true)}
                className='w-full flex mx-auto mt-5 lg:hidden uppercase gap-2 max-w-[280px] h-[40px] text-[14px] leading-[20px] text-center font-inter font-[600] bg-base-primary-green rounded-[3px] text-white   items-center justify-center'
            >
                <BiPlus /> <span>Add Sections</span>
            </button>
        </div>
    );
};

export default ResumeContent;

interface SectionControlProps {
    section: any;
    currentSection: string;
    sectionTitle: string;
}
const SectionControl = ({
    section,
    currentSection,
    sectionTitle,
}: SectionControlProps) => {
    const [openContent, setOpenContent] = useState(false);

    useEffect(() => {
        setOpenContent(currentSection == sectionTitle);
    }, [currentSection]);
    const splitWord = (word: string) =>
        word.replace(/([a-z])([A-Z])/g, "$1 $2");
    return (
        <div className='text-base-secondary-text relative'>
            <h3
                id={sectionTitle}
                onClick={() => setOpenContent((prev) => !prev)}
                className='px-[20px] cursor-pointer  font-inter text-[20px] font-[500] leading-[30px] py-[12px] bg-[rgba(196,196,196,0.28)] uppercase '
            >
                {splitWord(sectionTitle)}
            </h3>
            {openContent && (
                <div className='px-[10px] py-[30px]'>
                    <p className='pt-[23px] pb-[29px] px-[16px] py-[8px] border-r-[2px] border-primary-yellow bg-[rgba(226,187,83,0.10)] text-justify text-[16px] leading-[24px] font-[400] font-inter'>
                        {
                            <CheckSection
                                sectionTitle={sectionTitle}
                                section={section}
                            />
                        }
                    </p>
                </div>
            )}

            {openContent && (
                <EditButtons
                    removeAiEdit={
                        sectionTitle.toLocaleLowerCase() !==
                        "professionalsummary"
                    }
                />
            )}
        </div>
    );
};

const CheckSection = ({
    section,
    sectionTitle,
}: {
    section: any;
    sectionTitle: string;
}) => {
    if (sectionTitle === "skills") {
        return (
            <ul>
                {Object.keys(section).map((item) => (
                    <li className=' px-2' key={item}>
                        {section[item]}
                    </li>
                ))}
            </ul>
        );
    }
    if (sectionTitle === "education") {
        console.log(section);
        return (
            <div>
                {Object.keys(section).map((item) => (
                    <div key={item} className='grid grid-cols-2'>
                        <p className=''>
                            {" "}
                            <span className='font-semibold '>School:</span>{" "}
                            {section[item]?.school}
                        </p>{" "}
                        <div className='flex gap-4'>
                            <p className=''>
                                {" "}
                                <span className='font-semibold '>
                                    From:
                                </span>{" "}
                                {section[item]?.startYear}
                            </p>
                            <p className=''>
                                {" "}
                                <span className='font-semibold '>To:</span>{" "}
                                {section[item]?.startYear}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (sectionTitle === "workExperience") {
        console.log(section);
        return <></>;
    }
    if (sectionTitle === "professionalSummary") {
        return <>{section}</>;
    }

    return <>""</>;
};
