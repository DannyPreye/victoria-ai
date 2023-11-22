import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsArrowRightShort } from "react-icons/bs";

interface Props {
    sectionData: any;
}

const WhyUs = ({ sectionData }: Props) => {
    return (
        <section className='bg-white'>
            <div
                className=' container flex flex-col items-center lg:items-start mx-auto lg:px-[80px]
          py-[32px] px-[16px] lg:pt-[82px] '
            >
                <div className='flex flex-col items-start max-w-[585px]'>
                    <p
                        className='font-inter text-[16px] font-[600]
                 leading-[24px] text-base-primary-green'
                    >
                        {sectionData?.subheading}
                    </p>
                    <h2
                        className=' text-base-secondary-text lg:text-[36px]
                font-[600] text-[24px]  leading-[120%] lg:leading-[140%] mt-[8px] lg:mt-[12px] mb-[16px] lg:mb-[20px]'
                    >
                        {sectionData?.heading}
                    </h2>
                    <p
                        className='text-gray-600 font-inter text-[16px]
                lg:text-[20px] font-[400] leading-[24px] lg:leading-[30px]'
                    >
                        {sectionData?.paragraph}
                    </p>
                </div>

                <div className='flex flex-col gap-[64px] md:flex-wrap lg:flex-nowrap items-center lg:flex-row mt-[64px]'>
                    <Image
                        src={sectionData?.sectionImage?.data?.attributes?.url}
                        alt={
                            sectionData?.sectionImage?.data?.attributes
                                ?.alternativeText
                        }
                        width={592}
                        height={560}
                    />

                    <div className='flex flex-col gap-[48px]'>
                        {sectionData?.listPoints?.map((item: any) => (
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
                                        {item.heading}
                                    </h4>
                                    <p className='text-gray-600 font-inter text-[16px] leading-[24px] font-[400]'>
                                        {item.paragraph}
                                    </p>
                                    <Link
                                        className='flex items-center gap-[8px]
                                     text-[16px] font-[600] leading-[24px]
                                      font-inter text-base-primary-green
                                      mt-[20px]'
                                        href={item?.readMoreLink || "#"}
                                    >
                                        <span>Learn more</span>
                                        <BsArrowRightShort size={20} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
