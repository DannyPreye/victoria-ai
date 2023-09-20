import { atAGlanceSection } from "@/lib/contants";
import Image from "next/image";
import React from "react";

const AtAGlance = () => {
    return (
        <section className='bg-white'>
            <div
                className=' container mx-auto lg:px-[80px]
          py-[32px] px-[16px] lg:pt-[82px]'
            >
                <div className='flex flex-col items-center'>
                    <p
                        className='text-base-primary-green
                text-center text-[16pxpx] font-inter font-[600] leading-[24px]'
                    >
                        At A Glance
                    </p>
                    <h2
                        className=' text-base-secondary-text lg:text-[36px]
                font-[600]  leading-[120%] lg:leading-[140%] mt-[8px] lg:mt-[12px] mb-[16px] lg:mb-[20px]'
                    >
                        Plans that fit your scale
                    </h2>
                    <p
                        className='text-gray-600 font-inter text-[16px]
                lg:text-[20px] font-[400] leading-[24px] text-center lg:leading-[30px]'
                    >
                        Simple, transparent pricing that grows with you. Try any
                        plan free for 30 days.
                    </p>
                </div>
                <div className='flex text-center flex-wrap gap-[48px] justify-center lg:mt-[80px] '>
                    {atAGlanceSection.map((item, id) => (
                        <div
                            className='flex w-full max-w-[405.333px] flex-col items-center'
                            key={`glance_${id}`}
                        >
                            <Image
                                alt={item.title}
                                src={item.image}
                                width={250}
                                height={192}
                            />
                            <p className='text-black mt-[20px] text-[24px] font-[500] leading-[120%]'>
                                {item.title}
                            </p>
                            <p className='text-center text-gray-600 text-[20px] font-[400] leading-[140%]'>
                                {item.paragraph}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AtAGlance;
