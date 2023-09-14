import { coverLetterTemplates } from "@/lib/dummyData";
import React from "react";

const MyCoverLetterPage = () => {
    return (
        <div>
            <h1 className='text-base-secondary-text text-[24px] font-[500] leading-[28.8px]'>
                My Cover Letters
            </h1>
            <section className='mt-[44px] grid grid-cols-3 gap-[24px]'>
                {coverLetterTemplates.map((template, id) => (
                    <div
                        key={`template_${id}`}
                        style={{
                            background: `url('${template.image}') no-repeat`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                        className='w-full h-[512px]  max-w-[363px] group cursor-pointer bg-[#fafafa] '
                    >
                        <div className='group-hover:h-full h-0 overflow-hidden grid duration-700  w-full place-items-center bg-[rgba(0,0,0,0.25)] '>
                            <div className='flex flex-col items-center gap-[8px]'>
                                <button
                                    className='p-[16px] rounded-[8px] text-white text-[14px] font-[600] leading-[20px]
                             w-[250px] bg-base-primary-green'
                                >
                                    Edit Cover Letter
                                </button>
                                <button
                                    className='p-[16px] rounded-[8px] text-white text-[14px] font-[600] leading-[20px]
                             w-[250px] bg-base-primary-green'
                                >
                                    Preview Cover Letter
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default MyCoverLetterPage;
