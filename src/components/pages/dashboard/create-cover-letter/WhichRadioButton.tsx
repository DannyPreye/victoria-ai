"use client";
import React from "react";

interface WhichRadioButtonProps {
    title: string;
    description?: string;
    name?: string;
    id?: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}
export const WhichRadioButton = ({
    title,
    description,
    name,
    id,
    value,
    onChange,
}: WhichRadioButtonProps) => {
    return (
        <div className='flex w-fit items-start group gap-[12px]'>
            <input
                onChange={onChange}
                type='radio'
                className='w-[20px] flex-shrink-0 accent-base-primary-green h-[20px]'
                value={value}
                name={name}
                id={id}
            />
            <div className='grid gap-[16px]  '>
                <label
                    htmlFor={id}
                    className='text-gray-900  text-[14px]  font-[500]'
                >
                    {title}
                </label>
                <p
                    className='text-gray-600 duration-500
                 group-hover:text-[18px] group-hover:font-[500]
                 leading-[24px] font-[400] text-[16px]'
                >
                    {description}
                </p>
            </div>
        </div>
    );
};
