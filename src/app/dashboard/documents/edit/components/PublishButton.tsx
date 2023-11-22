"use client";
import React, { ReactNode } from "react";

interface PublishButtonProps {
    Icon: ReactNode;
    title: string;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
export const PublishButton = ({
    Icon,
    title,
    className,
    onClick,
}: PublishButtonProps) => {
    return (
        <button
            style={{
                boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
            }}
            className={`flex h-[40px] items-center gap-[8px]
     px-[18px] font-[500] text-[16px] rounded-[8px] leading-[24px]  ${className}`}
            onClick={onClick}
        >
            {Icon}
            {title}
        </button>
    );
};
