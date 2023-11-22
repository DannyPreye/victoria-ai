"use client";

import PageButton from "@/components/Button.components";
import { authSlides } from "@/constants/auth_slides.constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
    const slides = authSlides;
    const [currentSlide, setCurrentSlide] = useState(0);
    const slidesCount = Array.from({ length: slides.length });
    const router = useRouter();

    useEffect(() => {
        const timer = setInterval(() => {
            if (!(currentSlide >= slidesCount.length - 1)) {
                setCurrentSlide((prev) => prev + 1);
            } else {
                setCurrentSlide(0);
            }
        }, 5000);

        return () => {
            clearInterval(timer);
        };
    }, [currentSlide]);

    return (
        <div className='px-[16px] bg-white min-h-screen flex flex-col  justify-between'>
            <div className='px-[32px] py-[24px] grid place-items-center'>
                <Image
                    alt='instaletter'
                    src='/InstaLetter-logo.png'
                    width={207}
                    height={40}
                />
            </div>
            <div
                className='flex flex-col
            justify-center  items-center
             lg:w-[50%] gap-[72px]   overflow-x-hidden'
            >
                <div
                    style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                        transition: "all  2s ",
                    }}
                    className='w-full duration-500 flex   items-center'
                >
                    {slides.map((slide, id) => (
                        <div
                            key={id}
                            className='flex-shrink-0 w-full  flex  flex-col items-center'
                        >
                            <Image
                                src={slide.image}
                                alt=''
                                width={294}
                                height={200}
                            />
                            <h3 className='leading-[120%] text-center mt-[32px] text-[24px] font-[600] text-base-secondary-text'>
                                {slide.title}
                            </h3>
                            <p className='text-center max-w-[444px] w-full mt-[20px] leading-[24px] font-[500] text-[16px] text-gray-iron-600'>
                                {slide.paragraph}
                            </p>
                        </div>
                    ))}
                </div>

                <div className='flex  justify-center max-w-[444px] w-full  items-center gap-[12px]'>
                    {slidesCount.map((_, id) => (
                        <span
                            onClick={() => setCurrentSlide(id)}
                            key={id}
                            className={` ${
                                currentSlide == id
                                    ? "bg-primary-yellow"
                                    : "bg-gray-300"
                            } w-[10px] h-[10px] cursor-pointer rounded-full`}
                        ></span>
                    ))}
                </div>
            </div>
            <div className='p-[32px] grid place-items-center'>
                <PageButton
                    onClick={() => router.push("/dashboard")}
                    text='Continue'
                    variant='solid'
                    className='mt-[24px]  bg-primary-yellow h-[54px]'
                />
            </div>
        </div>
    );
};

export default Page;
