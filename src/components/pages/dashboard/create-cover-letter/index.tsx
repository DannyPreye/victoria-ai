"use client";
import DashboardHeading from "@/components/shared/DashboardHeading";
import React, { useState, useContext, useEffect } from "react";
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
import { getSingleTemplateWithId, singleUserPlan } from "@/lib/graphql-query";
import axios, { AxiosProgressEvent } from "axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { documentContext } from "@/contexts/ColorContext";
import fetchTemplate from "@/lib/functions/fetchTemplats";
import { cleangqlResponse } from "@/lib/functions/cleanGqlResponse";

interface Props {
    // plans: Plans;
}

const createCoverletterRadiobuttons = [
    {
        id: "what_describes_you",
        name: "what_describes_you",
        title: "Seeking a Position Within My Field, with Relevant Experience",
        description:
            "I am applying for a position in my current field, where I have already gained some or substantial experience that aligns with the requirements listed for this role.",
    },
    {
        id: "what_describes_you",
        name: "what_describes_you",
        title: "Entering the Workforce After Education, with Some Related Experience",
        description:
            "As a recent graduate, I am eager to enter the workforce and bring my relevant experience such as internships, part-time or short-term work, certifications, advanced curriculum and/or volunteer work, which I acquired during my educational training.",
    },
    {
        id: "what_describes_you",
        name: "what_describes_you",
        title: "Transitioning Careers, Leveraging Professional Experience",
        description:
            "I am in the process of changing my career path and can contribute with my professional experience, which may not be directly related but offers valuable skills and insights that can be adapted to this new role.",
    },
];

const CreateCoverLetterPage = ({}: Props) => {
    const [fileName, setFileName] = useState<string>();
    const [fileUrl, setFileUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();
    const [uploadProgress, setUploadProgress] = useState(0);
    const [resumeTemplate, setResumeTemplate] = useState<any>();
    const [coverLetterTemplate, setCoverLetterTemplate] = useState<any>();
    const [templateLoading, setTemplateLoading] = useState(true);
    const [templateTitle, setTemplateTitle] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const fileFormats = ["PDF"];
    const templateId = useSearchParams().get("template");
    const { handleAllResumeSections } = useContext(documentContext);

    const formik = useFormik({
        onSubmit: async (values) => {
            setIsLoading(true);
            if (fileUrl) {
                await toast.promise(
                    async () => {
                        const { data } = await axios.post(
                            `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/generate-document`,
                            { ...values, document_url: fileUrl },
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            }
                        );
                        console.log(data);
                        if (data) {
                            await handleCreate(data);

                            setIsLoading(false);
                        } else {
                            setIsLoading(false);
                        }
                    },
                    {
                        pending:
                            "Your letter and resume are being populated, this can take a little time",
                        success:
                            "Congratulation! document has been succefully generated",
                        error: "Something went wrong while trying to generate documents. Please try again",
                    }
                );
                setIsLoading(false);
                // Just doing a console.log for now
            } else {
                setIsLoading(false);
                toast.error("Please upload a resume");
            }
        },
        initialValues: {
            job_listing_url: "",
            company_url: "",
            notes: "",
            what_describes_you: "",
        },
    });

    const fetchTheTemplateSections = async () => {
        try {
            console.log(templateId);
            setTemplateLoading(true);

            const data = await gqlQery(
                getSingleTemplateWithId(templateId as string),
                session?.jwt
            );
            console.log(data);
            console.log(data.template?.data?.attributes?.title);

            if (data) {
                const cleanResumeResponse = cleangqlResponse(
                    data.template?.data?.attributes?.template?.resume
                );
                const cleanCoverLetterResponse = cleangqlResponse(
                    data?.template?.data?.attributes.template?.coverLetter
                );

                setTemplateTitle(data.template?.data?.attributes?.title);
                setCoverLetterTemplate(cleanCoverLetterResponse);
                setResumeTemplate(cleanResumeResponse);
            }
            setTemplateLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTheTemplateSections();
    }, [session?.jwt]);

    const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
        // This function is meant to should the file upload progress
        const { loaded, total } = progressEvent;
        let percent = total && Math.floor((loaded * 100) / total);
        setUploadProgress(percent as number);
    };

    console.log(coverLetterTemplate);

    const handleFile = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "USER_PDF");
            const { data } = await axios.post(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/upload`,
                formData,
                { onUploadProgress }
            );
            setFileName(`${data?.original_filename}.${data?.format}`);
            setFileUrl(data?.url);
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.error?.message);
            } else {
                toast.error("Something went wrong. Please try again");
            }
        }
    };

    console.log(resumeTemplate);
    const handleCreate = async (response: any) => {
        if (response.status == 200) {
            try {
                const data: any = await gqlQery(
                    singleUserPlan(session?.user.id as string),
                    session?.jwt as string
                );

                if (data?.usersPermissionsUser?.data.attributes.plan?.data) {
                    const { data } = await axios.post(
                        `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/user-documents`,
                        {
                            data: {
                                users_permissions_user: session?.user.id,
                                templateType: templateTitle,
                                template: {
                                    coverLetter: {
                                        previewImage:
                                            coverLetterTemplate.previewImage
                                                .data?.id,
                                        sections: {
                                            ...coverLetterTemplate.sections,
                                            heading: {
                                                ...coverLetterTemplate.sections
                                                    .heading,
                                                username:
                                                    response.coverletter?.find(
                                                        (item: any) =>
                                                            item.sectionTitle ===
                                                            "heading"
                                                    )?.username,
                                                contact: {
                                                    ...coverLetterTemplate
                                                        .sections?.heading
                                                        .contact,
                                                    phone: response.coverletter?.find(
                                                        (item: any) =>
                                                            item.sectionTitle ===
                                                            "heading"
                                                    )?.phone,
                                                    email: response.coverletter?.find(
                                                        (item: any) =>
                                                            item.sectionTitle ===
                                                            "heading"
                                                    )?.email,
                                                },
                                                professionalTitle:
                                                    response.coverletter?.find(
                                                        (item: any) =>
                                                            item.sectionTitle ===
                                                            "heading"
                                                    )?.professionalTitle,
                                            },
                                            opener: response.coverletter?.find(
                                                (item: any) =>
                                                    item.sectionTitle ===
                                                    "Opener"
                                            )?.content,

                                            body_1: response.coverletter?.find(
                                                (item: any) =>
                                                    item.sectionTitle ===
                                                    "Body 1"
                                            )?.content,
                                            body_2: response.coverletter?.find(
                                                (item: any) =>
                                                    item.sectionTitle ===
                                                    "Body 2"
                                            )?.content,
                                            body_3: response.coverletter?.find(
                                                (item: any) =>
                                                    item.sectionTitle ===
                                                    "Body 3"
                                            )?.content,
                                            conclusion:
                                                response.coverletter?.find(
                                                    (item: any) =>
                                                        item.sectionTitle ===
                                                        "Conclusion"
                                                )?.content,
                                            call_to_action:
                                                response.coverletter?.find(
                                                    (item: any) =>
                                                        item.sectionTitle ===
                                                        "Call To Action"
                                                )?.content,
                                        },
                                    },
                                    resume: {
                                        sections: {
                                            ...resumeTemplate.sections,
                                        },
                                        previewImage:
                                            resumeTemplate.previewImage.data
                                                ?.id,
                                    },
                                },
                            },
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${session?.jwt}`,
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    if (data) {
                        console.log(data);
                        console.log(data?.data?.id);
                        router.push(
                            `/dashboard/create-cover-letter/edit/${data?.data?.id}`
                        );
                    }
                } else {
                    setIsModalOpen(true);
                }
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong. Please try again");
            }
        } else {
            console.log("response from ai is ", response);
            throw new Error();
        }
    };

    return (
        <div>
            <DashboardHeading title='Create Cover Letter' />
            <form
                onSubmit={formik.handleSubmit}
                className=' p-[16px] lg:p-[32px]'
            >
                <div
                    className='flex text-base-secondary-text text-[20px] lg:text-[24px]
              font-[500] leading-[28.8px] justify-center items-center'
                >
                    <p>Upload your resume</p>
                </div>
                <div className='mt-[12px] w-full max-w-[796px] mx-auto flex flex-col items-center'>
                    <FileUploader
                        name='file'
                        //maxSize={10}
                        handleChange={handleFile}
                        types={fileFormats}
                        classes='w-full'
                    >
                        <div
                            className='w-full h-[182px]
            py-[16px] px-[24px] border-dashed border-[1px]
             border-gray-iron rounded-[8px] grid place-items-center relative'
                        >
                            <span
                                style={{ width: `${uploadProgress}%` }}
                                className={`absolute h-full left-0 top-0 bg-gray-200`}
                            ></span>
                            <div className='flex  relative flex-col items-center'>
                                <div
                                    className='w-[40px] z-10 h-[40px] rounded-[28px] overflow-hidden
                             border-[6px] bg-gray-iron-100 border-gray-iron-50
                              grid place-items-center text-gray-iron-600 cursor-pointer '
                                >
                                    <FiUploadCloud />
                                </div>
                                {fileName ? (
                                    <div className='font-inter mt-[12px] text-center leading-[20px]  text-[14px] text-gray-500 font-[400]'>
                                        <p>
                                            <span className='font-[700] text-base-primary-green '>
                                                {fileName}
                                            </span>{" "}
                                        </p>
                                    </div>
                                ) : (
                                    <div className='font-inter mt-[12px] text-center leading-[20px]  text-[14px] text-gray-500 font-[400]'>
                                        <p>
                                            <span className='font-[700] text-base-primary-green '>
                                                Click to upload
                                            </span>{" "}
                                            or drag and drop
                                        </p>
                                        <p className='text-[12px] leading-[18px]'>
                                            PDF
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </FileUploader>

                    <div className='flex flex-wrap gap-[24px] w-full mt-[24px] '>
                        <UrlComponent
                            onChange={formik.handleChange}
                            title='Job Listing URL'
                            placeholder='Paste Job Listing URL here'
                            id='job_listing_url'
                            value={formik.values.job_listing_url}
                        />
                        <UrlComponent
                            onChange={formik.handleChange}
                            value={formik.values.company_url}
                            title='Company URL'
                            placeholder='Paste Job Listing URL here'
                            id='company_url'
                        />
                    </div>

                    <div className=' w-full max-w-[796px] grid mt-[24px]  gap-[12px]'>
                        <h3 className='text-base-secondary-text text-[16px] leading-[20px] font-[500]'>
                            Which Describes you Best?
                        </h3>
                        <div className='grid gap-[16px]'>
                            {createCoverletterRadiobuttons.map((item) => (
                                <WhichRadioButton
                                    onChange={formik.handleChange}
                                    value={formik.values.what_describes_you}
                                    key={item.id}
                                    {...item}
                                />
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
                        type='submit'
                        title='Create Cover'
                        className='mt-[40px] h-[61px] text-[24px]'
                    />
                </div>
            </form>
            <Pricing
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                templateId={templateId as string}
                callbackURL={`/dashboard/create-cover-letter/edit/${templateId}`}
            />
        </div>
    );
};

export default CreateCoverLetterPage;
