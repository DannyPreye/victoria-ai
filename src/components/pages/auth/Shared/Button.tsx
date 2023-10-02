import React, { ReactNode } from "react";
import { Oval } from "react-loader-spinner";

interface Props {
    title: string;
    type?: "button" | "submit" | "reset" | undefined;
    Icon?: ReactNode;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    isloading?: boolean;
}
const Button = ({
    title,
    type,
    Icon,
    isloading,
    className,
    onClick,
}: Props) => {
    return Icon ? (
        <button
            onClick={onClick}
            type={type}
            className={`h-[53px] border-[1px] py-[12px]
        rounded-[8px] gap-[12px] flex text-base-secondary-text
        justify-center items-center w-full text-[24px]
         font-[600] leading-[120%] ${className}`}
        >
            {isloading ? (
                <span className='w-full h-full grid place-items-center'>
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
            ) : (
                <>
                    {Icon} <span> {title}</span>
                </>
            )}
        </button>
    ) : (
        <button
            type={type}
            onClick={onClick}
            className={`h-[53px] w-full text-white
             text-[24px] font-[600] leading-[120%] py-[12px] rounded-[8px]
         bg-base-primary-green ${className}`}
        >
            {isloading ? (
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
            ) : (
                title
            )}
        </button>
    );
};

export default Button;
