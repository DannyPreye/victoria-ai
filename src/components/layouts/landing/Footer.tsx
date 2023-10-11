import { footerSections } from "@/lib/contants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import {
    FaAngellist,
    FaDribbble,
    FaFacebook,
    FaGithub,
    FaLinkedin,
    FaTwitter,
} from "react-icons/fa";
import { footerSection } from "@/lib/graphql-query";

const socialIcons = [
    {
        Icon: FaTwitter,
        link: "",
    },
    {
        Icon: FaLinkedin,
        link: "",
    },

    {
        Icon: FaFacebook,
        link: "",
    },
    {
        Icon: FaGithub,
        link: "",
    },
    {
        Icon: FaAngellist,
        link: "",
    },

    {
        Icon: FaDribbble,
        link: "",
    },
];
const Footer = async () => {
    const client = new ApolloClient({
        uri: `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_GRAPHQL}`,
        cache: new InMemoryCache(),
    });
    const { data } = await client.query({
        query: gql`
            ${footerSection}
        `,
    });
    console.log(data);

    const footerData = data?.landingPage?.data?.attributes?.footerSection;
    console.log(footerData);

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

interface FooterSectionProps {
    title: string;
    sectionLinks: any[];
}
const FooterSection = ({ title, sectionLinks }: FooterSectionProps) => {
    return (
        <div className='flex flex-col gap-[16px]'>
            <h4 className='text-[14px] text-gray-500 font-inter font-[600] uppercase  leading-[20px]'>
                {title}
            </h4>
            <div className='flex flex-col gap-[12px]'>
                {sectionLinks.map((item, id) => (
                    <Link
                        className='flex gap-[8px]'
                        href={item.link || "#"}
                        key={`footer_${id}`}
                    >
                        <span
                            className='text-gray-600 font-[600]
                        font-inter leading-[24px] text-[16px]'
                        >
                            {item.title}
                        </span>
                        {item.isNew && (
                            <span
                                className='px-[8px] py-[2px] text-[#027A48]
                            text-center rounded-[16px] leading-[18px] font-[500]
                             font-[inter] text-[12px] bg-[#ECFDF3] '
                            >
                                New
                            </span>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
};
