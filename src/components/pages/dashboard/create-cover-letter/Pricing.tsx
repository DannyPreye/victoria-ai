import Modal from "@/components/shared/Modal";
import { pricing } from "@/lib/dummyData";
import React from "react";
import { HiOutlineCheckCircle } from "react-icons/hi";

interface PricingProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Pricing = ({ isModalOpen, setIsModalOpen }: PricingProps) => {
    return (
        <Modal>
            <div
                onClick={() => setIsModalOpen(false)}
                className={`fixed top-0 left-0 lg:px-[58px] lg:py-[58px] flex-col flex justify-center
                h-screen w-screen items-center  bg-[rgba(51,51,51,0.25)] ${
                    isModalOpen ? "block" : "hidden"
                }`}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className='bg-white overflow-auto py-[16px] lg:py-[48px] px-[16px] lg:px-[32px]'
                >
                    <div className='text-center grid gap-[16px]'>
                        <h3
                            className='text-gray-900
                         font-[600] text-[36px] leading-[50.4px]'
                        >
                            Simple, transparent pricing
                        </h3>
                        <p className='text-[20px] text-gray-600 font-[400] leading-[30px]'>
                            We believe Untitled should be accessible to all
                            companies, no matter the size.
                        </p>
                    </div>
                    <div className='flex lg:flex-nowrap flex-wrap justify-center gap-[32px]'>
                        {pricing.map((item, id) => (
                            <EachPricing {...item} key={`pricing_${id}`} />
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default Pricing;

interface EachPricingProps {
    priceName: string;
    price: number;
    pricingBenefits: string[];
    color: string;
    subTitle: string;
}
const EachPricing = ({
    price,
    priceName,
    pricingBenefits,
    color,
    subTitle,
}: EachPricingProps) => {
    return (
        <div
            className='w-full max-w-[384px] py-[40px]
         px-[32px] border-[1px] flex flex-col items-center shadow-md rounded-[8px]'
        >
            <button
                style={{
                    background: color,
                }}
                className={`w-fit  leading-[20px]
             font-inter text-white rounded-[16px]
             text-[14px] font-[500] px-[12px] py-[4px]`}
            >
                {priceName}
            </button>
            <h3
                className='text-[48px] mt-[16px] font-[600] leading-[140%]
             text-gray-900'
            >
                ${price}/mth
            </h3>
            <p
                className='font-inter leading-[24px] text-center
             font-[400] text-[16px] text-gray-600'
            >
                {subTitle}
            </p>
            <button
                style={{
                    background: color,
                }}
                className='mt-[16px] text-[16px] leading-[24px] font-inter
                font-[600] text-white h-[48px] rounded-[8px] w-full py-[12px]'
            >
                Get Started
            </button>
            <div className='mt-[32px] grid gap-[16px] border-t-[1px] border-gray-[200] py-[32px]'>
                {pricingBenefits.map((benefit, id) => (
                    <div key={id} className='flex gap-[12px] items-center'>
                        <HiOutlineCheckCircle
                            size={24}
                            className='text-success-600'
                        />
                        <span className='text-gray-600 leading-[24px] font-inter text-[16px]'>
                            {benefit}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
