import { coverLetterEdit } from "@/lib/dummyData";
import React from "react";

interface Props {
    currentSection: string;
}
const LetterContent = ({ currentSection }: Props) => {
    return (
        <div className='flex flex-col bg-gray-iron-50 py-[32px] px-[16px] lg:px-0  w-full  items-center'>
            <div className='max-w-[732px] '>
                {coverLetterEdit?.map((text, id) => (
                    <>
                        {text.section == "Header/Contact Info" ? (
                            <div
                                contentEditable
                                className='grid gap-[12px] pb-[24px] border-b-[1px] border-gray-iron-200'
                            >
                                <h2 className='text-base-primary-green text-[20px] lg:text-[30px] font-[600] leading-[30px] lg:leading-[140%]'>
                                    {text.body.heading}
                                </h2>
                                <p className='text-[16px] lg:text-[20px] font-[500] leading-[24px] lg:leading-[30px] font-inter text-base-secondary-text'>
                                    {text.body.p}
                                </p>
                            </div>
                        ) : text.section == "Sub Header" ? (
                            <div className='mt-[28px] mb-[32px] text-[16px] font-[600] text-base-primary-green'>
                                <p> {text.body.heading}</p>
                                <p>{text.body.p}</p>
                            </div>
                        ) : text.section !== "Signature" ? (
                            <div
                                className={`py-[8px] lg:py-[12px]
                            px-[16px] lg:px-[24px] ${
                                currentSection == text.section
                                    ? "border-r-[2px] border-primary-yellow bg-[rgba(226,187,83,0.10)]"
                                    : ""
                            }`}
                            >
                                <p
                                    className='text-justify text-base-secondary-text
                                 font-inter font-[400] text-[16px] leading-[24px]'
                                >
                                    {text.body.p}{" "}
                                </p>
                            </div>
                        ) : (
                            <div className='mt-[28px] px-[16px] mb-[32px] text-[16px] font-[600] text-base-primary-green'>
                                <p> {text.body.heading}</p>
                                <p>{text.body.p}</p>
                            </div>
                        )}
                    </>
                ))}
            </div>
        </div>
    );
};

export default LetterContent;
