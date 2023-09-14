import Button from "@/components/shared/Button";
import Image from "next/image";
import React from "react";
import { BsArrowRightShort, BsChevronRight } from "react-icons/bs";

const HeroSection = () => {
    return (
        <section className='flex justify-between items-center bg-gray-50'>
            <div className='w-[50%]'>
                <Image
                    src='/assets/images/home/badge-group.png'
                    alt=''
                    width={208}
                    height={24}
                />
                <h1 className='text-[48px] text-base-secondary-text  font-[600] leading-[67.2px] mt-[16px]'>
                    Job Winning Cover Letter With AI in Minutes
                </h1>
                <p className='mt-[24px] text-gray-600 max-w-[480px] font-inter text-[24px] leading-[140%]'>
                    Try our free builder and create a cover letter with the
                    power of AI. Let the Genius resume maker help build your
                    resume quickly and effortlessly.
                </p>
                <div className='mt-[48px] flex gap-[12px]'>
                    <Button title='Get Started' />
                    <Button
                        isTransparent
                        hasBorder
                        Icon={<BsArrowRightShort size={24} />}
                        title='Learn More'
                    />
                </div>
            </div>
            <div className='relative h-[600px] w-[50%]'>
                <Image
                    fill
                    src='/assets/images/home/content-image-hero.png'
                    alt=''
                />
            </div>
        </section>
    );
};

export default HeroSection;
