import { whyUsSectionLandingPage } from "@/lib/contants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsArrowRightShort } from "react-icons/bs";

const WhyUs = () => {
    return (
        <section
            className='bg-white container lg:px-[80px]
          py-[32px] px-[16px] lg:pt-[82px]'
        >
            <div className='flex flex-col items-start max-w-[585px]'>
                <p
                    className='font-inter text-[16px] font-[600]
                 leading-[24px] text-base-primary-green'
                >
                    Why QuickApplyAI?
                </p>
                <h2
                    className=' text-base-secondary-text lg:text-[36px]
                font-[600]  leading-[120%] lg:leading-[140%] mt-[8px] lg:mt-[12px] mb-[16px] lg:mb-[20px]'
                >
                    Why we are the best way to create a Cover Letter
                </h2>
                <p
                    className='text-gray-600 font-inter text-[16px]
                lg:text-[20px] font-[400] leading-[24px] lg:leading-[30px]'
                >
                    Spend smarter, lower your bills, get cashback on everything
                    you buy, and unlock credit to grow your business.
                </p>
            </div>

            <div className='flex flex-col gap-[64px] lg:flex-row mt-[64px]'>
                <Image
                    src='/assets/images/landing/why-us-img.png'
                    alt=''
                    width={592}
                    height={560}
                />

                <div className='flex flex-col gap-[48px]'>
                    {whyUsSectionLandingPage.map((item) => (
                        <div
                            key={item.title}
                            className='flex gap-[16px] items-start'
                        >
                            <div className='p-[16px] grid text-white place-items-center bg-primary-yellow rounded-full'>
                                <AiOutlineInfoCircle size={24} />
                            </div>
                            <div>
                                <h4
                                    className='text-base-secondary-text text-[24px]
                                font-[600] leading-[120%] '
                                >
                                    {item.title}
                                </h4>
                                <p className='text-gray-600 font-inter text-[16px] leading-[24px] font-[400]'>
                                    {item.paragraph}
                                </p>
                                <Link
                                    className='flex items-center gap-[8px]
                                     text-[16px] font-[600] leading-[24px]
                                      font-inter text-base-primary-green
                                      mt-[20px]'
                                    href={"#"}
                                >
                                    <span>Learn more</span>
                                    <BsArrowRightShort size={20} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
