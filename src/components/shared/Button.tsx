import React, { ReactNode } from "react";
import { IconType } from "react-icons";
import { Oval } from "react-loader-spinner";

interface Props {
    title: string;
    isTransparent?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    Icon?: any;
    hasBorder?: boolean;
    variant?: "filled" | "outline";
    isLoading?: boolean;
}
const Button = ({
    title,
    isTransparent,
    variant,
    onClick,
    Icon,
    hasBorder,
    isLoading,
}: Props) => {
    return (
        <button
            onClick={onClick}
            disabled={isLoading}
            style={{
                boxShadow:
                    variant == "filled"
                        ? "0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                        : "",
            }}
            className={`px-[18px] py-[10px] rounded-[8px]
             items-center justify-center text-[16px] flex gap-[12px]
              font-[600] leading-[24px] ${
                  variant == "filled"
                      ? "bg-base-primary-green   text-base-white"
                      : `bg-transparent  ${
                            variant == "outline"
                                ? "border-[1px] border-gray-300"
                                : ""
                        }`
              }`}
        >
            {isLoading && (
                <span className='w-full h-full grid place-items-center '>
                    <Oval
                        height={24}
                        width={24}
                        color='#4fa94d'
                        wrapperStyle={{}}
                        wrapperClass=''
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor='#E1AE25'
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                    />
                </span>
            )}
            <span>{title}</span>
            {Icon && Icon}
        </button>
    );
};

export default Button;
