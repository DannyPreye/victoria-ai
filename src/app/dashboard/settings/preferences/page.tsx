import React from "react";
import { ImPencil } from "react-icons/im";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { BiSolidCheckCircle } from "react-icons/bi";

const planBenefit = [
    "Access to all basic features",
    "Basic reporting and analytics",
    "Up to 10 individual users",
    "20GB individual data each user",
    "Basic chat and email support",
];
const page = () => {
    return (
        <div>
            <div className='flex flex-col gap-[24px] lg:flex-row lg:justify-between'>
                <div className='text-base-secondary-text'>
                    <h1 className='font-[600] text-[30px] leading-[42px]  '>
                        Preferences
                    </h1>
                    <p className='font-inter text-[14px] leading-[20px] font-[400]'>
                        Lorem ipsum dolor sit ametis ipsum dolor sit ametis
                    </p>
                </div>
                <button
                    style={{
                        boxShadow: "0px 1px 2px 0px rgba(43, 37, 17, 0.05)",
                    }}
                    className=' px-[16px] w-fit rounded-[8px] border-neutrals-500
                flex gap-[8px] text-[14px] font-[500] leading-[120% border-[1px] bg-white items-center '
                >
                    <ImPencil />
                    <span>Change Plan</span>
                </button>
            </div>

            <div className='mt-[48px] border-[2px] rounded-[8px] border-gray-200 overflow-hidden'>
                <div
                    className='px-[20px] bg-gray-50 py-[16px] flex items-center justify-between
                 border-b-[2px] border-gray-200 '
                >
                    <div className='flex items-center gap-[12px]'>
                        <div className='h-[40px] w-[40px] text-white bg-base-secondary-text rounded-full grid place-items-center'>
                            <HiOutlineCheckCircle size={20} />
                        </div>
                        <span className='text-base-secondary-text font-[600] text-[18px] leading-[120%]'>
                            Basic Plan
                        </span>
                    </div>
                    <BiSolidCheckCircle
                        size={24}
                        className='text-base-secondary-text'
                    />
                </div>

                <div className='p-[16px]'>
                    <h3>
                        <span className='text-base-secondary-text text-[40px] font-[600] leading-[120%] font-plus-jakarta'>
                            $10
                        </span>{" "}
                        <span>/month</span>
                    </h3>

                    <div className='mt-[19px] grid gap-[16px]'>
                        {planBenefit.map((plan) => (
                            <div
                                key={plan}
                                className='flex gap-[12px] items-center'
                            >
                                <HiOutlineCheckCircle
                                    size={24}
                                    className='text-success-600'
                                />
                                <span className='font-inter text-[16px] font-[400] leading-[24px] text-gray-600'>
                                    {plan}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
