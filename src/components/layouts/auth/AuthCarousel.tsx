"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export interface AuthCarouselProps {
    slides: {
        image: string;
        title: string;
        paragraph: string;
    }[];
}
const AuthCarousel = ({ slides }: AuthCarouselProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slidesCount = Array.from({ length: slides.length });

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
        <div
            className='hidden lg:flex flex-col
            justify-center  items-center
             lg:w-[50%] gap-[72px]  bg-gray-iron-50 overflow-x-hidden'
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
                            width={442}
                            height={300}
                        />
                        <h3 className='leading-[140%] text-center mt-[32px] text-[36px] font-[600] text-base-secondary-text'>
                            {slide.title}
                        </h3>
                        <p className='text-center max-w-[444px] w-full mt-[20px] leading-[28px] font-[500] text-[18px] text-gray-iron-600'>
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
    );
};

export default AuthCarousel;
