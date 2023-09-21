"use client";
import { testimonials } from "@/lib/contants";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Testimonial = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            if (!(currentSlide >= testimonials.length - 1)) {
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
        <section>
            <div
                className='container flex flex-col  mx-auto lg:px-[80px]
          py-[32px] px-[16px] lg:pt-[41px]'
            >
                <div className='flex flex-col items-center'>
                    <h2 className='text-base-secondary-text text-center text-[24px] lg:text-[36px] leading-[120%] lg:leading-[140%] font-[600]'>
                        Don&apos;t just take our word for it
                    </h2>
                    <p className='text-[#475467] text-center text-[16px] lg:text-[20px] font-[400] leading-[24px] lg:leading-[30px]'>
                        Hear from some of our amazing customers who are building
                        faster.
                    </p>
                </div>

                <div className='flex mt-[48px] overflow-x-hidden rounded-[24px] flex-col lg:flex-row '>
                    <div className='flex-1 overflow-x-hidden bg-base-primary-green'>
                        <div
                            style={{
                                transform: `translateX(-${
                                    currentSlide * 100
                                }%)`,
                                transition: "all 2s",
                            }}
                            className='flex w-full  '
                        >
                            {testimonials.map((testimonial, id) => (
                                <div
                                    key={`testimonial_${id}`}
                                    className='w-full px-[16px] pt-[32px] lg:px-[64px] lg:pt-[64px] flex-shrink-0'
                                >
                                    <div className='flex '>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <>
                                                {star <= testimonial.stars ? (
                                                    <AiFillStar
                                                        size={24}
                                                        className='text-primary-yellow'
                                                        key={star}
                                                    />
                                                ) : (
                                                    <AiOutlineStar
                                                        size={24}
                                                        className='text-white'
                                                    />
                                                )}
                                            </>
                                        ))}
                                    </div>

                                    <p className='mt-[24px] text-[30px] lg:text-[36px] text-white font-[500] leading-[140%] lg:leading-[44px] lg:tracking-[-0.72px]'>
                                        {testimonial.comment}
                                    </p>
                                    <div className='mt-[32px] text-white font-inter text-[18px]  font-[600] leading-[28px]'>
                                        <p>{testimonial.name}</p>
                                        <p
                                            className='text-gray-200 font-inter
                                        font-[400] text-[16px] leading-[24px]'
                                        >
                                            {testimonial.designation}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='px-[16px] lg:px-[64px] pb-[32px] lg:pb-[64px] mt-[32px] items-center gap-[16px] flex'>
                            {Array.from({ length: testimonials.length }).map(
                                (_, id) => (
                                    <span
                                        onClick={() => setCurrentSlide(id)}
                                        key={id}
                                        className={`w-[10px] cursor-pointer h-[10px] rounded-full ${
                                            currentSlide == id
                                                ? "bg-white"
                                                : "bg-gray-500"
                                        }`}
                                    />
                                )
                            )}
                        </div>
                    </div>
                    <Image
                        src={"/assets/images/landing/testimonial-image.png"}
                        alt=''
                        width={480}
                        height={464}
                    />
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
