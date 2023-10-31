import { TemplateSection } from "@/lib/types";
import React from "react";

interface Props {
    coverLetterSections: TemplateSection[];
}

const CoverLetter = ({ coverLetterSections }: Props) => {
    return (
        <div className='grid  border rounded-md'>
            <div className='col-span-9 p-5'>
                <div className='w-full '>
                    <h2 className='text-[30px] uppercase font-[600]  leading-[140%]'>
                        {coverLetterSections[0]?.heading}
                    </h2>
                    <p className='text-base-secondary-text font-inter text-[20px] font-[500] leading-[30px]'>
                        {" "}
                        {coverLetterSections[0]?.subheading}
                    </p>
                </div>
                <div className='grid gap-8 mt-8'>
                    <div className='mt-[28px] mb-[32px] text-[16px] font-[600] text-base-primary-green'>
                        <p>{coverLetterSections[1]?.heading}</p>
                        <p>{coverLetterSections[2]?.subheading}</p>
                    </div>
                    {/* Professional Summary */}
                    {coverLetterSections.slice(2).map((section, index) => (
                        <div key={index}>
                            {/* <h3 className='text-[20px] font-[600] capitalize leading-[30px] text-base-secondary-text'>
                                {section.sectionTitle}
                            </h3> */}
                            <p className='text-[14px] text-justify p-3'>
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='col-span-2'></div>
        </div>
    );
};

export default CoverLetter;
