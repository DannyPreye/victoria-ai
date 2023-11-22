"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface EachTemplateProps {
    template: any;
}
export const EachTemplate = ({ template }: EachTemplateProps) => {
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
                                `/dashboard/generate?template=${template?.id}`
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
