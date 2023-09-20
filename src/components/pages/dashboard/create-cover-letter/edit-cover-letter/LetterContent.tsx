import { coverLetterEdit } from "@/lib/dummyData";
import React from "react";
import { WiStars } from "react-icons/wi";
import { TfiReload } from "react-icons/tfi";
import { LuPenLine } from "react-icons/lu";

interface Props {
    currentSection: string;
}
const LetterContent = ({ currentSection }: Props) => {
    return (
        <div className='flex flex-col lg:px-[24px] lg:py-[32px]  bg-gray-iron-50 py-[32px] px-[16px]  w-full  items-center'>
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
                            <div
                                contentEditable
                                className='mt-[28px] mb-[32px] text-[16px] font-[600] text-base-primary-green'
                            >
                                <p> {text.body.heading}</p>
                                <p>{text.body.p}</p>
                            </div>
                        ) : text.section !== "Signature" ? (
                            <div
                                contentEditable
                                className={`py-[8px] lg:py-[12px]
                             relative `}
                            >
                                <p
                                    className={`text-justify  text-base-secondary-text
                                 font-inter font-[400] text-[16px] px-[16px] lg:px-[24px] leading-[24px] ${
                                     currentSection == text.section
                                         ? "border-r-[2px] border-primary-yellow bg-[rgba(226,187,83,0.10)]"
                                         : ""
                                 }`}
                                >
                                    {text.body.p}{" "}
                                </p>
                                {/* Edit buttons */}
                                {currentSection == text.section && (
                                    <EditButtons />
                                )}
                            </div>
                        ) : (
                            <div
                                contentEditable
                                className='mt-[28px] px-[16px] mb-[32px] text-[16px] font-[600] text-base-primary-green'
                            >
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

const EditButtons = () => {
    return (
        <div className=' gap-[16px]  justify-end absolute  right-[-8.5%] top-[20%] flex flex-col'>
            <button
                style={{
                    boxShadow: "0px 32px 64px -12px rgba(16, 24, 40, 0.14)",
                }}
                className='p-[14px] grid place-items-center bg-base-primary-green text-white rounded-full'
            >
                <WiStars size={24} />
            </button>
            <button
                style={{
                    boxShadow: "0px 32px 64px -12px rgba(16, 24, 40, 0.14)",
                }}
                className='p-[14px] relative grid place-items-center bg-white border-[1px] rounded-full'
            >
                <TfiReload size={24} />
                <span
                    style={{
                        aspectRatio: "1/1",
                    }}
                    className='w-[16px] text-[8px] leading-[120%] font-[500]   absolute top-0 right-0 bg-base-primary-green
                 rounded-full grid text-white place-items-center'
                >
                    2
                </span>
            </button>
            <button
                style={{
                    boxShadow: "0px 32px 64px -12px rgba(16, 24, 40, 0.14)",
                }}
                className='p-[14px] grid place-items-center bg-white border-[1px] rounded-full'
            >
                <LuPenLine size={24} />
            </button>
        </div>
    );
};
