"use client";
import DashboardHeading from "@/components/shared/DashboardHeading";
import { gqlQery } from "@/config/graphql.config";
import { coverLetterTemplates } from "@/lib/dummyData";
import { queryTemplates } from "@/lib/graphql-query";
import { Template, TemplateData } from "@/lib/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
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
                const data = await gqlQery(queryTemplates, session?.jwt);
                setTemplates(data.templates);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCoverLetters();
    }, [session?.jwt]);

    return (
        <div>
            <DashboardHeading title={"Select Cover Letter Template"} />
            <section className='mt-[44px] px-[16px] lg:px-[24px] grid  grid-cols-1 lg:grid-cols-3 gap-[24px]'>
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
                    templates?.data?.map((template, id) => (
                        <EachTemplate template={template} key={id} />
                    ))
                )}
            </section>
        </div>
    );
};

export default SelectTemplatePage;

interface EachTemplateProps {
    template: TemplateData;
}
const EachTemplate = ({ template }: EachTemplateProps) => {
    return (
        <div className='grid gap-[16px] w-full  max-w-[363px]'>
            <div className='w-full   h-[512px] relative mx-auto  group cursor-pointer bg-[#fafafa] '>
                <Image
                    src={
                        template.attributes.coverLetter.previewImage.data
                            .attributes.url
                    }
                    fill
                    alt={
                        template.attributes.coverLetter.previewImage.data
                            .attributes.alternativeText as string
                    }
                    className='object-contain'
                />
                <div className='group-hover:grid relative overflow-hidden hidden h-full  w-full place-items-end justify-center lg:place-items-center lg:bg-[rgba(0,0,0,0.25)] '>
                    <button
                        className='p-[16px] h-fit rounded-[8px] text-white text-[14px] font-[600] leading-[20px]
                             w-[250px] bg-base-primary-green'
                    >
                        Use This Template
                    </button>
                </div>
            </div>
            <h3 className='text-base-secondary-text font-inter text-[20px] leading-[30px] font-[600]'>
                {template.attributes.title}
            </h3>
        </div>
    );
};
