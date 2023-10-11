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

interface Props {
    sectionData: any;
}
const AboutSection = ({ sectionData }: Props) => {
    console.log(sectionData);
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
                        {sectionData?.firstHeading}
                    </p>
                    <div className='flex mt-[32px] lg:justify-center items-center gap-[24px] flex-col lg:flex-row'>
                        {sectionData?.companyLogos?.map((data: any) => (
                            <Image
                                key={""}
                                alt=''
                                width={170}
                                height={48}
                                src={data?.logo?.data?.attributes?.url}
                            />
                        ))}
                    </div>
                </div>

                <div className='mt-[41px] w-full max-w-[768px] mx-auto  flex flex-col items-center'>
                    <p className='text-primary-yellow text-[16px] font-[500] leading-[24px] font-inter'>
                        {sectionData?.secondHeading}
                    </p>
                    <h2
                        className='text-center mt-[12px] font-[600]
                leading-[140%] text-base-secondary-text text-[36px]'
                    >
                        {sectionData?.MainHeading}
                    </h2>
                    <p className='text-gray-600 text-center mt-[20px] font-inter text-[20px] leading-[30px]'>
                        {sectionData?.paragraph}
                    </p>
                </div>

                <div className='mt-[32px] lg:mt-[64px]'>
                    <Image
                        src={sectionData?.sectionImage?.data?.attributes?.url}
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
