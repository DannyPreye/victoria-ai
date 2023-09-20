import React from "react";

const AtAGlance = () => {
    return (
        <section
            className='bg-white container lg:px-[80px]
          py-[32px] px-[16px] lg:pt-[82px]'
        >
            <div className='flex flex-col items-center'>
                <p
                    className='text-base-primary-green
                text-center text-[16pxpx] font-inter font-[600] leading-[24px]'
                >
                    At A Glance
                </p>
                <h2
                    className=' text-base-secondary-text lg:text-[36px]
                font-[600]  leading-[120%] lg:leading-[140%] mt-[8px] lg:mt-[12px] mb-[16px] lg:mb-[20px]'
                >
                    Plans that fit your scale
                </h2>
                <p
                    className='text-gray-600 font-inter text-[16px]
                lg:text-[20px] font-[400] leading-[24px] text-center lg:leading-[30px]'
                >
                    Simple, transparent pricing that grows with you. Try any
                    plan free for 30 days.
                </p>
            </div>
        </section>
    );
};

export default AtAGlance;
