"use client";
import DashboardHeading from "@/components/shared/DashboardHeading";
import { gqlQery } from "@/config/graphql.config";
import { coverLetterTemplates } from "@/lib/dummyData";
import { getTemplates, queryTemplates } from "@/lib/graphql-query";
import { Template, TemplateData } from "@/lib/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";

const SelectTemplatePage = () => {
    const [templates, setTemplates] = useState<Template>();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setError] = useState(false);
    const { data: session } = useSession();

    const getCoverLetters = async () => {
        try {
            if (session?.jwt) {
                setIsLoading(true);
                const data = await gqlQery(getTemplates(1), session?.jwt);
                setTemplates(data.templates);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setError(true);
        }
    };

    useEffect(() => {
        getCoverLetters();
    }, [session?.jwt]);

    console.log("This is the templates", templates);

    return (
        <div>
            <DashboardHeading title={"Select Cover Letter Template"} />
            {isLoading ? (
                <div className=' grid place-items-center py-5'>
                    <Circles
                        height='80'
                        width='80'
                        color='#07397D'
                        ariaLabel='circles-loading'
                        visible={true}
                    />
                </div>
            ) : (
                <section className='mt-[44px] px-[16px] lg:px-[24px] grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]'>
                    {templates?.data?.map((template, id) => (
                        <EachTemplate template={template} key={id} />
                    ))}
                </section>
            )}
        </div>
    );
};

export default SelectTemplatePage;

interface EachTemplateProps {
    template: any;
}
const EachTemplate = ({ template }: EachTemplateProps) => {
    const router = useRouter();
    return (
        <div className='grid gap-[16px] w-full '>
            <div className='w-full   h-[512px] flex    relative mx-auto  group cursor-pointer bg-[#fafafa] '>
                <div className='relative w-[50%] h-full '>
                    <Image
                        src={
                            template?.attributes?.template?.coverLetter
                                ?.previewImage.data?.attributes.url
                        }
                        fill
                        alt={
                            template?.attributes.template?.coverLetter
                                ?.previewImage?.data?.attributes
                                .alternativeText as string
                        }
                        className='object-contain'
                    />
                </div>
                <div className='relative w-[50%] h-full'>
                    <Image
                        src={
                            template?.attributes?.template?.resume?.previewImage
                                ?.data?.attributes?.url
                        }
                        fill
                        alt={
                            template?.attributes?.template?.coverLetter
                                ?.previewImage?.data?.attributes
                                ?.alternativeText as string
                        }
                        className='object-contain'
                    />
                </div>
                <div className='group-hover:grid absolute top-0 left-0  overflow-hidden hidden h-full  w-full place-items-end justify-center lg:place-items-center lg:bg-[rgba(0,0,0,0.25)] '>
                    <button
                        onClick={() =>
                            router.push(
                                `/dashboard/create-cover-letter?template=${template?.id}`
                            )
                        }
                        className='p-[16px] h-fit rounded-[8px] text-white text-[14px] font-[600] leading-[20px]
                             w-[250px] bg-base-primary-green'
                    >
                        Use This Template
                    </button>
                </div>
            </div>
            <h3 className='text-base-secondary-text font-inter text-[20px] leading-[30px] font-[600]'>
                {template?.attributes?.title}
            </h3>
        </div>
    );
};
