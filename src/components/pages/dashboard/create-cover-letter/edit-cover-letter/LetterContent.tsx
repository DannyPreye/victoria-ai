import { coverLetterEdit } from "@/lib/dummyData";
import React from "react";
import { WiStars } from "react-icons/wi";
import { TfiReload } from "react-icons/tfi";
import { LuPenLine } from "react-icons/lu";
import { TemplateSection } from "@/lib/types";

interface Props {
    currentSection: string;
    setCurrentSection: React.Dispatch<React.SetStateAction<string>>;
    sections: TemplateSection[];
}
const LetterContent = ({
    currentSection,
    setCurrentSection,
    sections,
}: Props) => {
    return (
        // <div className='flex flex-col lg:px-[24px] lg:py-[32px]  bg-gray-iron-50 py-[32px] px-[16px]  w-full'>
            <div className='mx-auto w-full max-w-[80%]'>
                {sections?.map((text, id) => (
                    <>
                        {text.title == sections[0].title ? (
                            <div
                                id={`${text.title.split(" ").join("-")}`}
                                contentEditable
                                className='grid gap-[12px] pb-[24px] border-b-[1px] border-gray-iron-200'
                            >
                                <h2 className='text-base-primary-green text-[20px] lg:text-[30px] font-[600] leading-[30px] lg:leading-[140%]'>
                                    {/* {text.body.heading} */}
                                </h2>
                                <p className='text-[16px] lg:text-[20px] font-[500] leading-[24px] lg:leading-[30px] font-inter text-base-secondary-text'>
                                    {text.content}
                                </p>
                            </div>
                        ) : text.title == sections[1].title ? (
                            <div
                                id={`${text.title.split(" ").join("-")}`}
                                onClick={() => setCurrentSection(text.title)}
                                contentEditable
                                className='mt-[28px] mb-[32px] text-[16px] font-[600] text-base-primary-green'
                            >
                                {/* <p> {text.body.heading}</p> */}
                                <p>{text.content}</p>
                            </div>
                        ) : text.title !==
                          sections[sections.length - 1].title ? (
                            <div
                                id={`${text.title.split(" ").join("-")}`}
                                contentEditable
                                className={`py-[8px] lg:py-[12px]
                             relative `}
                            >
                                <p
                                    onClick={() =>
                                        setCurrentSection(text.title)
                                    }
                                    className={`text-justify  text-base-secondary-text
                                 font-inter font-[400] text-[16px] py-[8px] px-[16px] lg:px-[24px] leading-[24px] ${
                                     currentSection == text.title
                                         ? "border-r-[2px] border-primary-yellow bg-[rgba(226,187,83,0.10)]"
                                         : ""
                                 }`}
                                >
                                    {text.content}{" "}
                                </p>
                                {/* Edit buttons */}
                                {currentSection == text.title && (
                                    <EditButtons />
                                )}
                            </div>
                        ) : (
                            <div
                                id={`${text.title.split(" ").join("-")}`}
                                contentEditable
                                className='mt-[28px] px-[16px] mb-[32px] text-[16px] font-[600] text-base-primary-green'
                            >
                                {/* <p> {text.body.heading}</p> */}
                                <p>{text.content}</p>
                            </div>
                        )}
                    </>
                ))}
            </div>
        // </div>
    );
};

export default LetterContent;

const EditButtons = () => {
    return (
        <div className=' gap-[16px] border-b-[1px] py-[16px] justify-end absolute right-[-3%] lg:right-[-8.5%] top-[20%] flex flex-col'>
            <button
                style={{
                    boxShadow: "0px 32px 64px -12px rgba(16, 24, 40, 0.14)",
                }}
                className='w-[33px] h-[33px] lg:w-[52px] lg:h-[52px] text-[12px] lg:text-[24px] relative bg-white grid place-items-center border-white border-[1px]  text-primary-yellow rounded-full'
            >
                <WiStars />
                <span
                    style={{
                        aspectRatio: "1/1",
                    }}
                    className='w-[16px] text-[8px] leading-[120%] font-[500]   absolute top-[-5%] lg:top-0 right-[-2%] lg:right-0 bg-base-primary-green
                 rounded-full grid text-white place-items-center'
                >
                    1
                </span>
            </button>

            <button
                style={{
                    boxShadow: "0px 32px 64px -12px rgba(16, 24, 40, 0.14)",
                }}
                className='w-[33px] h-[33px] lg:w-[52px] lg:h-[52px] text-[12px] lg:text-[24px] grid place-items-center bg-white border-[1px] rounded-full'
            >
                <LuPenLine />
            </button>
        </div>
    );
};
