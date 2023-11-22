"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface EachDocProps {
    template: any;
    docName: string;
    docId: string;
}
export const EachDocument = ({ template, docName, docId }: EachDocProps) => {
    const router = useRouter();

    console.log(template);
    return (
        <div className='grid gap-[16px] w-full '>
            <div className='w-full   h-[512px] flex    relative mx-auto  group cursor-pointer bg-[#fafafa] '>
                <div className='relative w-[50%] h-full '>
                    <Image
                        src={
                            template.coverLetter?.previewImage?.data?.attributes
                                .url
                        }
                        fill
                        alt={
                            template.coverLetter.previewImage.data?.attributes
                                ?.alternativeText as string
                        }
                        className='object-contain'
                    />
                </div>
                <div className='relative w-[50%] h-full'>
                    <Image
                        src={
                            template.resume?.previewImage?.data?.attributes.url
                        }
                        fill
                        alt={
                            template.resume.previewImage?.data?.attributes
                                .alternativeText as string
                        }
                        className='object-contain'
                    />
                </div>
                <div className='group-hover:flex flex-col absolute top-0 left-0  overflow-hidden hidden h-full gap-2  w-full  justify-center items-center  lg:bg-[rgba(0,0,0,0.25)] '>
                    <button
                        onClick={() =>
                            router.push(`/dashboard/documents/edit/${docId}`)
                        }
                        className='p-[16px] h-fit rounded-[8px] text-white text-[14px] font-[600] leading-[20px]
                             w-[250px] bg-base-primary-green'
                    >
                        Edit Documents
                    </button>
                    <button
                        onClick={() =>
                            router.push(`/dashboard/documents/preview/${docId}`)
                        }
                        className='p-[16px] h-fit rounded-[8px] text-white text-[14px] font-[600] leading-[20px]
                             w-[250px] bg-base-primary-green'
                    >
                        Preview Documents
                    </button>
                </div>
            </div>

            <h3 className='text-base-secondary-text font-inter text-[20px] leading-[30px] font-[600]'>
                {docName}
            </h3>
        </div>
    );
};
