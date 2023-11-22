import Link from "next/link";
import React from "react";

interface FooterSectionProps
{
    title: string;
    sectionLinks: any[];
}
export const FooterSection = ({ title, sectionLinks }: FooterSectionProps) =>
{
    return (
        <div className='flex flex-col gap-[16px]'>
            <h4 className='text-[14px] text-gray-500 font-inter font-[600] uppercase  leading-[20px]'>
                { title }
            </h4>
            <div className='flex flex-col gap-[12px]'>
                { sectionLinks.map((item, id) => (
                    <Link
                        className='flex gap-[8px]'
                        href={ item.link || "#" }
                        key={ `footer_${id}` }
                    >
                        <span
                            className='text-gray-600 font-[600]
                        font-inter leading-[24px] text-[16px]'
                        >
                            { item.title }
                        </span>
                        { item.isNew && (
                            <span
                                className='px-[8px] py-[2px] text-[#027A48]
                            text-center rounded-[16px] leading-[18px] font-[500]
                             font-[inter] text-[12px] bg-[#ECFDF3] '
                            >
                                New
                            </span>
                        ) }
                    </Link>
                )) }
            </div>
        </div>
    );
};
