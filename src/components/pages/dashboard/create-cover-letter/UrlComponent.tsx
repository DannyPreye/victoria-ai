"use client";
import React from "react";
import { BsLink45Deg } from "react-icons/bs";

interface UrlComponentProps {
    title: string;
    onChange?: () => {};
    onBlur?: () => {};
    name?: string;
    id: string;
    placeholder?: string;
}
export const UrlComponent = ({
    title,
    id,
    name,
    placeholder,
}: UrlComponentProps) => {
    return (
        <div className='grid gap-[12px] w-full '>
            <label
                className='text-[16px] font-[500] leading-[20px]
                 text-base-secondary-text'
                htmlFor={id}
            >
                {title}
            </label>
            <div
                className='py-[16px] px-[14px] w-full lg:w-[386px] h-[56px]
             rounded-[8px] border-[1px] border-gray-300
             flex gap-[12px] items-center text-gray-500'
            >
                <BsLink45Deg size={20} />
                <input
                    className='outline-none text-[16px]
                     font-[400] leading-[24px] flex-1 border-none'
                    type='text'
                    name={name}
                    id={id}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
};
