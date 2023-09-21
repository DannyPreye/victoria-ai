"use client";
import { faqs } from "@/lib/contants";
import React, { useState } from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { BiPlusCircle } from "react-icons/bi";
import { BsDashCircle } from "react-icons/bs";

const Support = () => {
    return (
        <section className='bg-white'>
            <div
                className='container flex flex-col lg:flex-row gap-[32px] lg:gap-[64px]  mx-auto lg:px-[80px]
          lg:py-[90px] py-[32px] px-[16px] lg:pt-[41px]'
            >
                <div className='w-full max-w-[448px]'>
                    <p
                        className='text-primary-yellow font-inter
                     font-[600] leading-[24px] text-[16px]'
                    >
                        Support
                    </p>
                    <h2
                        className='text-base-secondary-text
                    text-[24px] lg:text-[36px] font-[600] leading-[120%] lg:leading-[140%]'
                    >
                        FAQs
                    </h2>
                    <p
                        className='text-gray-600 mt-[20px] font-inter
                   text-[16px] lg:text-[18px] font-[400] leading-[28px]'
                    >
                        Everything you need to know about the product and
                        billing. Can&apos;t find the answer you&apos;re looking
                        for? Please chat to our friendly team.
                    </p>
                </div>
                <Faqs />
            </div>
        </section>
    );
};

export default Support;

const Faqs = () => {
    const [currentFaq, setCurrentFaq] = useState({ index: 0, isOpen: false });
    return (
        <div className='flex flex-col gap-[32px] max-w-[704px] w-full'>
            {faqs.map((faq, id) => (
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
