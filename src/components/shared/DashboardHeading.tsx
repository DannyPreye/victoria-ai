import React from "react";

interface Props {
    title: string;
}
const DashboardHeading = ({ title }: Props) => {
    return (
        <h1
            className='text-base-secondary-text
            border-b-[1px] lg:px-[24px] px-[16px] py-[16px]
             lg:py-0 lg:border-none text-[20px] lg:text-[24px]
              font-[500] leading-[28.8px]'
        >
            {title}
        </h1>
    );
};

export default DashboardHeading;
