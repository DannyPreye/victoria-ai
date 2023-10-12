import React from "react";
import { FormField } from "@/components/ui/form";
import Input from "postcss/lib/input";
interface Props {
    value: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    id?: string;
    type?: string;
    className?: string;
    moreInfo?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
    onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
    isError?: boolean;
    errorMessage?: string | undefined;
    maxlength?:number
}
const InputElement = ({
    label,
    className,
    required,
    id,
    type,
    placeholder,
    value,
    moreInfo,
    onChange,
    onBlur,
    isError,
    errorMessage,
    maxlength
}: Props) => {
    return (
        <div className={`grid gap-[6px] ${className}`}>
            <label
                className='font-inter text-base-secondary-text
                 text-[14px] font-[500] leading-[20px]'
                htmlFor={id}
            >
                {label} {required && "*"}
            </label>
            <input
                maxLength={maxlength}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                style={{
                    boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                }}
                type={type || "text"}
                className='px-[14px] py-[10px] w-full h-[44px]
                 rounded-[8px] border-[1px] border-gray-300'
                placeholder={placeholder}
                id={id}
            />
            {isError && errorMessage && (
                <p className='text-red-500 font-inter text-[12px] '>
                    {errorMessage}
                </p>
            )}
            {moreInfo && (
                <p
                    className='font-inter text-gray-600
                 text-[14px] font-[400] leading-[20px]'
                >
                    {moreInfo}
                </p>
            )}
        </div>
    );
};

export default InputElement;
