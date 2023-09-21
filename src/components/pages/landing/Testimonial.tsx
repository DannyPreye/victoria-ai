import Image from "next/image";
import React from "react";

const Testimonial = () => {
    return (
        <section>
            <div
                className='container flex flex-col  mx-auto lg:px-[80px]
          py-[32px] px-[16px] lg:pt-[41px]'
            >
                <div className='flex flex-col items-center'>
                    <h2 className='text-base-secondary-text text-[36px] leading-[140%] font-[600]'>
                        Don&apos;t just take our word for it
                    </h2>
                    <p className='text-[#475467] text-center text-[20px] font-[400] leading-[30px]'>
                        Hear from some of our amazing customers who are building
                        faster.
                    </p>
                </div>

                <div className='flex mt-[48px] overflow-x-hidden rounded-[24px] flex-col lg:flex-row '>
                    <div className='flex-1 bg-base-primary-green p-[64px]'>
                        <p>
                            Love the simplicity of the service and the prompt
                            customer support. We can&apos;t imagine working
                            without it.
                        </p>
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
