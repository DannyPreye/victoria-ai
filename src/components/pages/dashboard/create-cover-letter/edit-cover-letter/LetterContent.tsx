"use client";
import { coverLetterEdit } from "@/lib/dummyData";
import React, { useContext } from "react";
import { TfiReload } from "react-icons/tfi";
import { TemplateSection } from "@/lib/types";
import { EditButtons } from "./EditButtons";
import { documentContext } from "@/contexts/ColorContext";

interface Props {
    currentSection: string;
    setCurrentSection: React.Dispatch<React.SetStateAction<string>>;
    sections: any;
}
const LetterContent = ({
    currentSection,
    setCurrentSection,
    sections,
}: Props) => {
    const { currentColor } = useContext(documentContext);
    const extractSectionHeadings =
        typeof sections === "object" ? Object.keys(sections) : [];
    return (
        // <div className='flex flex-col lg:px-[24px] lg:py-[32px]  bg-gray-iron-50 py-[32px] px-[16px]  w-full'>
        <div className='mx-auto w-full  lg:w-[778px]'>
            {extractSectionHeadings?.map((text, id) => (
                <>
                    {text == "heading" ? (
                        <div
                            id={text}
                            className='grid gap-[12px] pb-[24px] border-b-[1px] border-gray-iron-200'
                        >
                            <h2
                                style={{ color: currentColor }}
                                className='text-base-primary-green text-[20px] lg:text-[30px] font-[600] leading-[30px] lg:leading-[140%]'
                            >
                                {sections[text]?.username}
                            </h2>
                            <p className='text-[16px] lg:text-[20px] font-[500] leading-[24px] lg:leading-[30px] font-inter text-base-secondary-text'>
                                {sections[text]?.professionalTitle}
                            </p>
                        </div>
                    ) : text == "greetings" ? (
                        <div
                            style={{ color: currentColor }}
                            id={text}
                            onClick={() => setCurrentSection(text)}
                            className='mt-[28px] mb-[32px] text-[16px] font-[600] text-base-primary-green'
                        >
                            {/* <p>{text?.heading}</p> */}
                            <p>{sections[text]}</p>
                        </div>
                    ) : text !== "signature" ? (
                        <div
                            id={text}
                            className={`py-[8px] lg:py-[12px]
                             relative `}
                        >
                            <p
                                onClick={() => setCurrentSection(text)}
                                className={`text-justify  text-base-secondary-text
                                 font-inter font-[400] text-[16px] py-[8px] px-[16px] lg:px-[24px] leading-[24px] ${
                                     currentSection == text
                                         ? "border-r-[2px] border-primary-yellow bg-[rgba(226,187,83,0.10)]"
                                         : ""
                                 }`}
                            >
                                {sections[text]}{" "}
                            </p>

                            {currentSection == text && <EditButtons />}
                        </div>
                    ) : (
                        <div
                            style={{ color: currentColor }}
                            id={text}
                            className='mt-[28px] px-[16px] mb-[32px] text-[16px] font-[600] text-base-primary-green'
                        >
                            <p>{sections[text]}</p>
                        </div>
                    )}
                </>
            ))}
        </div>
        // </div>
    );
};

export default LetterContent;
