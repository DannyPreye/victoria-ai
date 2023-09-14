import { coverLetterTemplates } from "@/lib/dummyData";
import React from "react";

const SelectTemplatePage = () => {
    return (
        <div>
            <h1 className='text-base-secondary-text text-[24px] font-[500] leading-[28.8px]'>
                Select Cover Letter Template
            </h1>
            <section className='mt-[44px] grid grid-cols-1 lg:grid-cols-3 gap-[24px]'>
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
                        <div className='group-hover:grid  overflow-hidden hidden h-full  w-full place-items-center bg-[rgba(0,0,0,0.25)] '>
                            <button
                                className='p-[16px] rounded-[8px] text-white text-[14px] font-[600] leading-[20px]
                             w-[250px] bg-base-primary-green'
                            >
                                Use This Template
                            </button>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default SelectTemplatePage;
