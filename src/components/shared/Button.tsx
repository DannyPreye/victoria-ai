import React, { ReactNode } from "react";
import { IconType } from "react-icons";

interface Props {
    title: string;
    isTransparent?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    Icon?: any;
    hasBorder?: boolean;
}
const Button = ({ title, isTransparent, onClick, Icon, hasBorder }: Props) => {
    return (
        <button
            onClick={onClick}
            style={{
                boxShadow: !isTransparent
                    ? "0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                    : "",
            }}
            className={`px-[18px] py-[10px] rounded-[8px]
             items-center justify-center text-[16px] flex gap-[12px]
              font-[600] leading-[24px] ${
                  !isTransparent
                      ? "bg-base-primary-green   text-base-white"
                      : `bg-transparent  ${
                            hasBorder ? "border-[1px] border-gray-300" : ""
                        }`
              }`}
        >
            <span>{title}</span>
            {Icon && Icon}
        </button>
    );
};

export default Button;
