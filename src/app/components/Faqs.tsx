"use client";
import React, { useState } from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { BiPlusCircle } from "react-icons/bi";

interface FaqProps {
    faqs: any;
}
export const Faqs = ({ faqs }: FaqProps) => {
    const [currentFaq, setCurrentFaq] = useState({ index: 0, isOpen: false });
    return (
        <div className='flex flex-col gap-[32px] max-w-[704px] w-full'>
            {faqs.map((faq: any, id: any) => (
                <div
                    className='flex  w-full justify-between gap-[24px] items-start'
                    key={`faq_${id}`}
                >
                    <div className=' '>
                        <p
                            className='text-gray-900 font-inter
                         text-[18px] font-[500] leading-[28px]'
                        >
                            {faq.question}
                        </p>

                        <p
                            className={`text-gray-600
                            w-full max-w-[656px] text-[16px]
                             font-[400] leading-[24px] font-inter ${
                                 currentFaq.index == id && currentFaq.isOpen
                                     ? "h-fit"
                                     : "h-0 overflow-hidden"
                             }`}
                        >
                            {faq.answer}
                        </p>
                    </div>
                    <div
                        className='cursor-pointer text-gray-400'
                        onClick={() =>
                            setCurrentFaq((prev) => ({
                                index: id,
                                isOpen: !prev.isOpen,
                            }))
                        }
                    >
                        {currentFaq.index == id && currentFaq.isOpen ? (
                            <AiOutlineMinusCircle size={24} />
                        ) : (
                            <BiPlusCircle size={24} />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
