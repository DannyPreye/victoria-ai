import React, { ReactNode } from "react";

interface Props {
    title: string;
    type?: string;
    Icon?: ReactNode;
    className?: string;
}
const Button = ({ title, type, Icon, className }: Props) => {
    return Icon ? (
        <button
            className={`h-[53px] border-[1px] py-[12px]
        rounded-[8px] gap-[12px] flex text-base-secondary-text
        justify-center items-center text-[24px]
         font-[600] leading-[120%] ${className}`}
        >
            {Icon} <span> {title}</span>
        </button>
    ) : (
        <button
            className={`h-[53px] text-white text-[24px] font-[600] leading-[120%] py-[12px] rounded-[8px]
         bg-base-primary-green ${className}`}
        >
            {title}
        </button>
    );
};

export default Button;
