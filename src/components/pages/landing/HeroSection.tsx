"use client";
import Button from "@/components/shared/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { BsArrowRightShort, BsChevronRight } from "react-icons/bs";

interface Props {
    heroData: any;
}
const HeroSection = ({ heroData }: Props) => {
    const router = useRouter();
    return (
        <section className='bg-gray-50  '>
            <div
                className='flex flex-col lg:flex-row justify-between
         items-center  container mx-auto lg:px-[80px]
          pt-[32px] lg:py-[32px] px-[16px] lg:pt-[84px] '
            >
                <div className='lg:w-[50%] ]'>
                    <Image
                        src={`${heroData?.HeroSmallImage?.data?.attributes?.url}`}
                        alt=''
                        width={208}
                        height={24}
                    />
                    <h1
                        className='text-[36px] leading-[50.4px] lg:text-[48px] text-base-secondary-text
                  font-[600] lg:leading-[67.2px] mt-[16px]'
                    >
                        {heroData?.HeroTitle}
                    </h1>
                    <p
                        className='mt-[16px] lg:mt-[24px] text-gray-600 max-w-[480px]
                 font-inter lg:text-[24px] text-[20px]  leading-[30px] lg:leading-[140%] font-[400] '
                    >
                        {heroData?.HeroParagraph}
                    </p>
                    <div className='mt-[32px] lg:mt-[48px] flex gap-[12px]'>
                        {heroData?.ActionButton?.map((button: any) => (
                            <Button
                                key={button?.title}
                                variant={button?.Variant?.toLowerCase()}
                                onClick={() =>
                                    button?.Link &&
                                    router.push(`${button?.Link}`)
                                }
                                title={button?.Title}
                            />
                        ))}
                        {/* <Button
                            onClick={() => router.push("/auth/sign-up")}
                            title='Get Started'
                        />
                        <Button
                            isTransparent
                            hasBorder
                            Icon={<BsArrowRightShort size={24} />}
                            title='Learn More'
                        /> */}
                    </div>
                </div>
                <div className='relative h-[600px] lg:w-[50%] lg:mt-0 my-[32px]'>
                    <Image
                        width={576}
                        height={600}
                        src={`${heroData?.HeroImage?.data?.attributes?.url}`}
                        alt=''
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
