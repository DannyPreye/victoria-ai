"use client";
import Image from "next/image";
import React from "react";

const partners = [
    "/assets/images/landing/fictional-company-logo.png",
    "/assets/images/landing/fictional-company-logo-1.png",
    "/assets/images/landing/fictional-company-logo-2.png",
    "/assets/images/landing/fictional-company-logo-3.png",
    "/assets/images/landing/fictional-company-logo-4.png",
    "/assets/images/landing/fictional-company-logo-5.png",
];
const AboutSection = () => {
    return (
        <section className='bg-white'>
            <div
                className='container lg:px-[80px]
          my-[32px] px-[16px]  lg:mt-[82px] mx-auto'
            >
                <div>
                    <p
                        className='text-base-primary-green
                text-center text-[24px] font-[500] leading-[120%]'
                    >
                        Join 4,000+ companies already growing
                    </p>
                    <div className='flex mt-[32px] items-center gap-[24px] flex-col lg:flex-row'>
                        {partners.map((img) => (
                            <Image
                                key={img}
                                alt=''
                                width={170}
                                height={48}
                                src={img}
                            />
                        ))}
                    </div>
                </div>

                <div className='mt-[41px] w-full max-w-[768px] mx-auto  flex flex-col items-center'>
                    <p className='text-primary-yellow text-[16px] font-[500] leading-[24px] font-inter'>
                        We fee proud in providing best
                    </p>
                    <h2
                        className='text-center mt-[12px] font-[600]
                leading-[140%] text-base-secondary-text text-[36px]'
                    >
                        HR-Approved Templates
                    </h2>
                    <p className='text-gray-600 text-center mt-[20px] font-inter text-[20px] leading-[30px]'>
                        Highlight the Unique Selling Proposition (USP) with a
                        short summary of the main feature and how it benefits
                        customers. The idea here is to keep it short and direct.
                        If the visitor wishes to learn more they will hit the
                        button.
                    </p>
                </div>

                <div className='mt-[32px] lg:mt-[64px]'>
                    <Image
                        src='/assets/images/landing/screen-mockup.png'
                        alt=''
                        height={810}
                        width={1216}
                    />
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
