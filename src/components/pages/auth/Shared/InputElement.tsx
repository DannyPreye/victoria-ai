import React from "react";

interface Props {
    value: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    id?: string;
    type?: string;
    className?: string;
    moreInfo?: string;
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
                style={{
                    boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                }}
                type={type || "text"}
                className='px-[14px] py-[10px] w-full h-[44px]
                 rounded-[8px] border-[1px] border-gray-300'
                placeholder={placeholder}
            />
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
