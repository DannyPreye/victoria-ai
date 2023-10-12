import SecurityPage from "@/components/pages/dashboard/setting/Security";
import Button from "@/components/shared/Button";
import React from "react";
import { IconType } from "react-icons";
import { ImPencil } from "react-icons/im";
import { VscKey } from "react-icons/vsc";

const page = () => {
    return <SecurityPage />;
};

export default page;

interface InputProps {
    label: string;
    placeholder: string;
    Icon: IconType;
    id: string;
    value: string | undefined;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}
const InputElement = ({
    label,
    placeholder,
    Icon,
    id,
    onChange,
    value,
}: InputProps) => {
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
                    onChange={onChange}
                    value={value}
                    type='text'
                    placeholder={placeholder}
                    id={id}
                    className='flex-1 bg-transparent border-none outline-none'
                />
            </div>
        </div>
    );
};
