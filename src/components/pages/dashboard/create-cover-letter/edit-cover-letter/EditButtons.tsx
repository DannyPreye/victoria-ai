import React from "react";
import { WiStars } from "react-icons/wi";
import { LuPenLine } from "react-icons/lu";

interface Props {
    removeAiEdit?: boolean;
}
export const EditButtons = ({ removeAiEdit }: Props) => {
    return (
        <div className=' gap-[16px]  py-[16px] justify-end absolute right-[-3%] lg:right-[-8.5%] top-[20%] flex flex-col'>
            {!removeAiEdit && (
                <button
                    style={{
                        boxShadow: "0px 32px 64px -12px rgba(16, 24, 40, 0.14)",
                    }}
                    className='w-[33px] h-[33px] lg:w-[52px] lg:h-[52px] text-[12px] lg:text-[24px] relative bg-white grid place-items-center border-white border-[1px]  text-primary-yellow rounded-full'
                >
                    <WiStars />
                    <span
                        style={{
                            aspectRatio: "1/1",
                        }}
                        className='w-[16px] text-[8px] leading-[120%] font-[500]   absolute top-[-5%] lg:top-0 right-[-2%] lg:right-0 bg-base-primary-green
                 rounded-full grid text-white place-items-center'
                    >
                        1
                    </span>
                </button>
            )}

            <button
                style={{
                    boxShadow: "0px 32px 64px -12px rgba(16, 24, 40, 0.14)",
                }}
                className='w-[33px] h-[33px] lg:w-[52px] lg:h-[52px] text-[12px] lg:text-[24px] grid place-items-center bg-white border-[1px] rounded-full'
            >
                <LuPenLine />
            </button>
        </div>
    );
};
