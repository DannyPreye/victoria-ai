"use client";
import DashboardHeading from "@/components/shared/DashboardHeading";
import { coverLetterTemplates } from "@/lib/dummyData";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";

interface Props {
    templates: any[];
}

const MyCoverLetterPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [templates, setTemplates] = useState<any[]>([]);
    const { data: session } = useSession();

    const getUserDocs = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/documents`,
                {
                    headers: {
                        Authorization: `Bearer ${session?.jwt}`,
                    },
                }
            );
            setTemplates(data?.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getUserDocs();
    }, [session?.jwt]);

    return (
        <div>
            <DashboardHeading title='My Cover Letters' />
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
            ) : templates.length > 0 ? (
                <section className='mt-[44px] px-[16px] lg:px-[24px]  grid grid-cols-1 lg:grid-cols-3 gap-[24px]'>
                    {templates.map((data, id) => (
                        <EachDocument
                            template={data?.template}
                            docName={data?.title}
                            docId={data?.id}
                            key={data?.id}
                        />
                    ))}
                </section>
            ) : (
                <div className=' grid place-items-center py-5'>
                    <p>You don&apos;t have any document yet</p>
                </div>
            )}
        </div>
    );
};

export default MyCoverLetterPage;

interface EachDocProps {
    template: any;
    docName: string;
    docId: string;
}
const EachDocument = ({ template, docName, docId }: EachDocProps) => {
    const router = useRouter();
    return (
        <div className='grid gap-[16px] w-full '>
            <div className='w-full   h-[512px] flex    relative mx-auto  group cursor-pointer bg-[#fafafa] '>
                <div className='relative w-[50%] h-full '>
                    <Image
                        src={template.coverLetter?.previewImage?.url}
                        fill
                        alt={
                            template.coverLetter.previewImage
                                .alternativeText as string
                        }
                        className='object-contain'
                    />
                </div>
                <div className='relative w-[50%] h-full'>
                    <Image
                        src={template.coverLetter?.previewImage?.url}
                        fill
                        alt={
                            template.coverLetter.previewImage
                                .alternativeText as string
                        }
                        className='object-contain'
                    />
                </div>
                <div className='group-hover:flex flex-col absolute top-0 left-0  overflow-hidden hidden h-full gap-2  w-full  justify-center items-center  lg:bg-[rgba(0,0,0,0.25)] '>
                    <button
                        onClick={() =>
                            router.push(
                                `/dashboard/create-cover-letter/edit/${docId}`
                            )
                        }
                        className='p-[16px] h-fit rounded-[8px] text-white text-[14px] font-[600] leading-[20px]
                             w-[250px] bg-base-primary-green'
                    >
                        Edit Documents
                    </button>
                    <button
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
