import Image from "next/image";
import Link from "next/link";
import React from "react";

import { socialIcons } from "@/constants/social_icons.constant";
import { footerSection } from "@/utils/gql/fetchFooterSection";
import { gqlQery } from "@/config/grapql/graphql.config";
import { FooterSection } from "./FooterSection";

const Footer = async () => {
    const data = await gqlQery(footerSection);
    const footerData = data?.landingPage?.data?.attributes?.footerSection;

    return (
        <footer
            className='container py-[12px] px-[16px] mx-auto p-[16px]
         lg:px-[64px]  grid gap-[64px] lg:py-[26px]'
        >
            <div className='flex-wrap flex gap-[] items-start justify-between'>
                <div className='flex gap-[32px] flex-col w-full max-w-[320px]'>
                    <Image
                        src={"/InstaLetter-logo.png"}
                        alt='instaLetter'
                        width={165}
                        height={32}
                    />
                    <p className='text-gray-600 text-[16px] leading-[24px] font-inter'>
                        {footerData?.paragraph}
                    </p>
                </div>
                <div className='flex flex-wrap lg:flex-nowrap gap-[64px]'>
                    {footerData?.section?.map((section: any, id: any) => (
                        <FooterSection
                            title={section?.title}
                            sectionLinks={section?.links}
                            key={`footer_section_${id}`}
                        />
                    ))}
                </div>
            </div>

            <div
                className='flex justify-between flex-wrap gap-[20px] items-center
            border-t-[1px] py-[32px] border-gray-200'
            >
                <p
                    className='font-inter font-[400]
                leading-[24px] text-[16px] text-gray-500'
                >
                    &copy; {new Date().getFullYear()} InstaLetter. All rights
                    reserved
                </p>
                <div className='flex gap-[24px] text-gray-400'>
                    {socialIcons.map((item, id) => (
                        <Link key={`social_id_${id}`} href={item.link || "#"}>
                            <item.Icon size={24} />
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
