import Image from "next/image";
import React from "react";

interface Props {
    sectionData: any;
}
const CustomerStories = ({ sectionData }: Props) => {
    return (
        <section className=''>
            <div
                className=' container flex flex-col lg:flex-row lg:justify-center items-center lg:items-start mx-auto lg:px-[80px]
          py-[32px] px-[16px] lg:pt-[82px] '
            >
                <div>
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
                    </div>

                    <div className='flex justify-between'>
                        <div className='grid gap-[48px] mb-[32px] lg:mb-0 lg:grid-cols-2'>
                            {sectionData?.accomplishments?.map(
                                (stat: any, id: any) => (
                                    <Stats
                                        key={`stats_${id}`}
                                        number={stat?.number}
                                        title={stat?.text}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
                <Image
                    alt={
                        sectionData?.sectionImage?.data?.attributes
                            ?.alternativeText
                    }
                    width={592}
                    height={560}
                    src={sectionData?.sectionImage?.data?.attributes?.url}
                />
            </div>
        </section>
    );
};

export default CustomerStories;

interface StatsProps {
    number: string;
    title: string;
}
const Stats = ({ number, title }: StatsProps) => {
    return (
        <div className='max-w-[264px] w-full px-[24px] border-l-[2px] border-gray-200'>
            <p className='text-primary-yellow text-[36px] lg:text-[48px] font-[600] leading-[140%]'>
                {number}
            </p>
            <p className='font-inter text-[16px] lg:text-[18px] font-[600] leading-[24px] lg:leading-[20px]'>
                {title}
            </p>
        </div>
    );
};
