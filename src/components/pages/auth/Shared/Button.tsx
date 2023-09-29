import React, { ReactNode } from "react";

interface Props {
    title: string;
    type?: "button" | "submit" | "reset" | undefined;
    Icon?: ReactNode;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
const Button = ({ title, type, Icon, className, onClick }: Props) => {
    return Icon ? (
        <button
            onClick={onClick}
            type={type}
            className={`h-[53px] border-[1px] py-[12px]
        rounded-[8px] gap-[12px] flex text-base-secondary-text
        justify-center items-center w-full text-[24px]
         font-[600] leading-[120%] ${className}`}
        >
            {Icon} <span> {title}</span>
        </button>
    ) : (
        <button
            type={type}
            onClick={onClick}
            className={`h-[53px] w-full text-white
             text-[24px] font-[600] leading-[120%] py-[12px] rounded-[8px]
         bg-base-primary-green ${className}`}
        >
            {title}
        </button>
    );
};

export default Button;
