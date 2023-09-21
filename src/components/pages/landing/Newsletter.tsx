import React from "react";
import Button from "../auth/Shared/Button";
import Link from "next/link";
import Image from "next/image";

const Newsletter = () => {
    return (
        <section className='bg-white'>
            <div className='bg-primary-yellow'>
                <div
                    className='container flex flex-col relative   mx-auto lg:px-[80px]
          lg:pt-[80px] pb-[64px] lg:pb-[160px] px-[16px] pt-[32px]'
                >
                    <div className=' flex flex-col items-center'>
                        <div>
                            <h2
                                className='text-base-secondary-text
                    text-[24px] lg:text-[36px] font-[600] font-inter leading-[120%]
                     lg:leading-[44px] text-center tracking-[-0.72px]'
                            >
                                We&apos;ll send you a nice letter once per week
                            </h2>
                            <p
                                className='text-[#475467] text-center
                     text-[20px] font-inter font-[400] mt-[20px] leading-[30px]'
                            >
                                Join over 4,000+ startups already growing with
                                Untitled.
                            </p>
                        </div>

                        <form className='flex flex-wrap gap-[20px]  mx-auto mt-[40px]'>
                            <div className='flex flex-col gap-[6px]'>
                                <input
                                    type='email'
                                    placeholder='Enter your email'
                                    name=''
                                    id=''
                                    className='px-[14px] w-full max-w-[360px] outline-none py-[12px]
                        rounded-[8px] border-[1px] border-gray-300
                         bg-white
                        '
                                />
                                <p className='text-[14px]  font-[400] text-base-secondary-text leading-[20px] font-inter'>
                                    We care about your data in our{" "}
                                    <Link
                                        href={"#"}
                                        className='underline text-[#475467]'
                                    >
                                        privacy policy.
                                    </Link>
                                </p>
                            </div>
                            <button
                                style={{
                                    boxShadow:
                                        "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                                }}
                                className='w-[119px] font-inter rounded-[8px] leading-[24px] font-[600]
                    h-[48px] bg-base-primary-green text-white text-[16px]'
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className='flex relative mx-auto top-[-40px] lg:top-[-64px] p-0 lg:px-[114px] flex-col lg:items-center'>
                <Image
                    alt='newsletter'
                    src={"/assets/images/landing/newsletter-image.png"}
                    width={1216}
                    height={516}
                />
            </div>
        </section>
    );
};

export default Newsletter;
