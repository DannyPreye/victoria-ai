import Button from "@/components/shared/Button";
import React from "react";
import { IconType } from "react-icons";
import { ImPencil } from "react-icons/im";
import { VscKey } from "react-icons/vsc";

const SecurityPage = () => {
    return (
        <div className='pb-[117px] lg:pb-0'>
            <div className='flex flex-col gap-[24px] lg:flex-row lg:justify-between'>
                <div className='text-base-secondary-text'>
                    <h1 className='font-[600] text-[30px] leading-[42px]  '>
                        Security
                    </h1>
                    <p className='font-inter text-[14px] leading-[20px] font-[400]'>
                        Lorem ipsum dolor sit ametis ipsum dolor sit ametis
                    </p>
                </div>
            </div>

            <form className='mt-[48px] grid gap-[32px]'>
                <InputElement
                    Icon={VscKey}
                    id='current_password'
                    placeholder='Enter Current Password'
                    label='Current Password'
                />
                <InputElement
                    Icon={VscKey}
                    id='new_password'
                    placeholder='Enter New Password'
                    label='New Password'
                />
                <InputElement
                    Icon={VscKey}
                    id='confirm_password'
                    placeholder='Confirm New Password'
                    label='Confirm New Password'
                />
                <div className='flex justify-end items-center gap-[24px] '>
                    <Button title='Cancel' isTransparent hasBorder />
                    <Button title='Save' />
                </div>
            </form>
        </div>
    );
};

interface InputProps {
    label: string;
    placeholder: string;
    Icon: IconType;
    id: string;
}
const InputElement = ({ label, placeholder, Icon, id }: InputProps) => {
    return (
        <div className='grid gap-[12px] w-full'>
            <label
                className='text-base-secondary-text text-[16px] font-[500] leading-[20px]'
                htmlFor={id}
            >
                {label}
            </label>
            <div
                className='border-[1px] rounded-[8px] py-[16px] px-[14px]
            flex items-center gap-[12px] text-gray-500 text-[16px]
            font-[400] w-full leading-[24px] font-inter'
            >
                <Icon size={20} />
                <input
                    type='text'
                    placeholder={placeholder}
                    id={id}
                    className='flex-1 bg-transparent border-none outline-none'
                />
            </div>
        </div>
    );
};
