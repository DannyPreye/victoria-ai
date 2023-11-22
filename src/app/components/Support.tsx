"use client";

import React from "react";
import { Faqs } from "./Faqs";

interface Props {
    sectionData: any;
}
const Support = ({ sectionData }: Props) => {
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
                        {sectionData?.subheading}
                    </p>
                    <h2
                        className='text-base-secondary-text
                    text-[24px] lg:text-[36px] font-[600] leading-[120%] lg:leading-[140%]'
                    >
                        {sectionData?.heading}
                    </h2>
                    <p
                        className='text-gray-600 mt-[20px] font-inter
                   text-[16px] lg:text-[18px] font-[400] leading-[28px]'
                    >
                        {sectionData?.paragraph}
                    </p>
                </div>
                <Faqs faqs={sectionData?.faq} />
            </div>
        </section>
    );
};

export default Support;
