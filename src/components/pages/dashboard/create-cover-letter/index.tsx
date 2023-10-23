"use client";
import DashboardHeading from "@/components/shared/DashboardHeading";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { FiUploadCloud } from "react-icons/fi";
import { UrlComponent } from "./UrlComponent";
import { WhichRadioButton } from "./WhichRadioButton";
import Pricing from "./Pricing";
import { Plans } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "../../auth/Shared/Button";
import { useSession } from "next-auth/react";
import { gqlQery } from "@/config/graphql.config";
import { singleUserPlan } from "@/lib/graphql-query";
import axios from "axios";
import { toast } from "react-toastify";

interface Props {
    plans: Plans;
}

const createCoverletterRadiobuttons = [
    {
        id: "which",
        name: "which",
        title: "Seeking a Position Within My Field, with Relevant Experience",
        description:
            "I am applying for a position in my current field, where I have already gained some or substantial experience that aligns with the requirements listed for this role.",
    },
    {
        id: "another",
        name: "another",
        title: "Entering the Workforce After Education, with Some Related Experience",
        description:
            "As a recent graduate, I am eager to enter the workforce and bring my relevant experience such as internships, part-time or short-term work, certifications, advanced curriculum and/or volunteer work, which I acquired during my educational training.",
    },
    {
        id: "yet-another",
        name: "yet-another",
        title: "Transitioning Careers, Leveraging Professional Experience",
        description:
            "I am in the process of changing my career path and can contribute with my professional experience, which may not be directly related but offers valuable skills and insights that can be adapted to this new role.",
    },
];

const CreateCoverLetterPage = ({ plans }: Props) => {
    const [file, setFile] = useState<File>();
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const fileFormats = ["JPG", "PNG", "SVG", "GIF"];
    const templateId = useSearchParams().get("template");

    const handleFile = (file: File) => {};

    const handleCreate = async () => {
        setIsLoading(true);
        try {
            const data: any = await gqlQery(
                singleUserPlan(session?.user.id as string),
                session?.jwt as string
            );

            if (data?.usersPermissionsUser?.data.attributes.plan?.data) {
                const { data } = await axios.post(
                    `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/create-document`,
                    {
                        templateId,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${session?.jwt}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (data.status) {
                    router.push(
                        `/dashboard/create-cover-letter/edit/${data?.data?.id}`
                    );
                }
            } else {
                setIsModalOpen(true);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            toast.error("Something went wrong. Please try again");
        }
    };

    return (
        <div>
            <DashboardHeading title='Create Cover Letter' />
            <div className=' p-[16px] lg:p-[32px]'>
                <div className='mt-[12px] w-full max-w-[796px] mx-auto flex flex-col items-center  '>
                    <FileUploader
                        name='file'
                        maxSize={10}
                        handleChange={handleFile}
                        types={fileFormats}
                        classes='w-full'
                    >
                        <div
                            className='w-full h-[182px]
            py-[16px] px-[24px] border-dashed border-[1px]
             border-gray-iron rounded-[8px] grid place-items-center'
                        >
                            <div className='flex flex-col items-center'>
                                <div
                                    className='w-[40px] h-[40px] rounded-[28px]
                             border-[6px] bg-gray-iron-100 border-gray-iron-50
                              grid place-items-center text-gray-iron-600 cursor-pointer '
                                >
                                    <FiUploadCloud />
                                </div>
                                <div className='font-inter mt-[12px] text-center leading-[20px]  text-[14px] text-gray-500 font-[400]'>
                                    <p>
                                        <span className='font-[700] text-base-primary-green '>
                                            Click to upload
                                        </span>{" "}
                                        or drag and drop
                                    </p>
                                    <p className='text-[12px] leading-[18px]'>
                                        SVG, PNG, JPG or GIF (max. 800x400px)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </FileUploader>

                    <div className='flex flex-wrap gap-[24px] w-full mt-[24px] '>
                        <UrlComponent
                            title='Job Listing URL'
                            placeholder='Paste Job Listing URL here'
                            id='job-listing'
                        />
                        <UrlComponent
                            title='Company URL'
                            placeholder='Paste Job Listing URL here'
                            id='company-url'
                        />
                    </div>

                    <div className=' w-full max-w-[796px] grid mt-[24px]  gap-[12px]'>
                        <h3 className='text-base-secondary-text text-[16px] leading-[20px] font-[500]'>
                            Which Describes you Best?
                        </h3>
                        <div className='grid gap-[16px]'>
                            {createCoverletterRadiobuttons.map((item) => (
                                <WhichRadioButton key={item.id} {...item} />
                            ))}
                        </div>
                    </div>

                    <div className='mt-[28px] w-full grid gap-[12px]'>
                        <p
                            className='text-base-secondary-text
                         text-[16px] font-[500] leading-[20px]'
                        >
                            Notes
                        </p>
                        <textarea
                            style={{
                                boxShadow:
                                    "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                            }}
                            name=''
                            id=''
                            placeholder='Any additional information or key highlights like “I am willing to relocate for this job position"'
                            className='w-full bg-white h-[138px] px-[14px] py-[16px]
                            rounded-[8px] border-[1px] border-gray-300 leading-[24px] outline-none text-[16px] font-inter text-gray-500'
                        ></textarea>
                    </div>

                    <Button
                        isloading={isLoading}
                        onClick={handleCreate}
                        title='Create Cover'
                        className='mt-[40px] h-[61px] text-[24px]'
                    />
                </div>
            </div>
            <Pricing
                plans={plans}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                callbackURL={`/dashboard/create-cover-letter/edit/${templateId}`}
            />
        </div>
    );
};

export default CreateCoverLetterPage;
