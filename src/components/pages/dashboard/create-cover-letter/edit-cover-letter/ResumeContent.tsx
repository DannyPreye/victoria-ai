"use client";
import { TemplateSection } from "@/lib/types";
import React, { useContext, useEffect, useState } from "react";
import { EditButtons } from "./EditButtons";
import { documentContext } from "@/contexts/ColorContext";

interface Props {
    currentSection: string;
    setCurrentSection: React.Dispatch<React.SetStateAction<string>>;
    sections: TemplateSection[];
}
const ResumeContent = ({
    currentSection,
    setCurrentSection,
    sections,
}: Props) => {
    const { currentColor } = useContext(documentContext);
    return (
        <div className='mx-auto w-full lg:w-[778px] '>
            <div className='pt-[12px] grid gap-[12px] mb-[29px] border-b-[2px] border-b-gray-iron-200 pb-[28px]'>
                <h2
                    style={{ color: currentColor }}
                    className='text-[30px] uppercase font-[600]  leading-[140%]'
                >
                    {sections[1]?.content}
                </h2>
                <p className='text-base-secondary-text font-inter text-[20px] font-[500] leading-[30px]'>
                    {sections[1]?.subtitle}
                </p>
            </div>

            <div className='grid gap-[12px]'>
                {sections.slice(2)?.map((section, id) => (
                    <SectionControl
                        currentSection={currentSection}
                        section={section}
                        key={id}
                    />
                ))}
            </div>
        </div>
    );
};

export default ResumeContent;

interface SectionControlProps {
    section: TemplateSection;
    currentSection: string;
}
const SectionControl = ({ section, currentSection }: SectionControlProps) => {
    const [openContent, setOpenContent] = useState(false);

    useEffect(() => {
        setOpenContent(
            currentSection.split("-").join(" ").toLowerCase() ==
                section.title.toLowerCase()
        );
    }, [currentSection]);
    return (
        <div className='text-base-secondary-text relative'>
            <h3
                id={section.title.split(" ").join("-")}
                onClick={() => setOpenContent((prev) => !prev)}
                className='px-[20px] cursor-pointer  font-inter text-[20px] font-[500] leading-[30px] py-[12px] bg-[rgba(196,196,196,0.28)] uppercase '
            >
                {section.title}
            </h3>
            {openContent && (
                <div className='px-[10px] py-[30px]'>
                    <p className='pt-[23px] pb-[29px] px-[16px] py-[8px] border-r-[2px] border-primary-yellow bg-[rgba(226,187,83,0.10)] text-justify text-[16px] leading-[24px] font-[400] font-inter'>
                        {section.content}
                    </p>
                </div>
            )}

            {openContent && (
                <EditButtons
                    removeAiEdit={
                        section.title.toLocaleLowerCase() !==
                        "professional summary"
                    }
                />
            )}
        </div>
    );
};
