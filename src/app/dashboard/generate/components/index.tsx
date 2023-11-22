"use client";
import DashboardHeading from "@/components/DashboardHeading.components";
import { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import { FiUploadCloud } from "react-icons/fi";
import { UrlComponent } from "./UrlComponent";
import { WhichRadioButton } from "./WhichRadioButton";
import Pricing from "@/components/Pricing.components";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { gqlQery } from "@/config/grapql/graphql.config";
import { getSingleTemplateWithId } from "@/utils/gql/template.gql";
import axios, { AxiosProgressEvent } from "axios";
import { useFormik } from "formik";
import { createCoverletterRadiobuttons } from "@/constants/create-document-radio.constants";
import { cleangqlResponse } from "@/utils/functions/ cleanGQLResponse";
import PageButton from "@/components/Button.components";
import { useToast } from "@chakra-ui/react";
import { generateDocument } from "@/utils/functions/asyncFunctions/generateDocument";

interface Props {
    // plans: Plans;
}

const GenerateDocumentPage = ({}: Props) => {
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
    const toast = useToast();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const fileFormats = ["PDF"];
    const templateId = useSearchParams().get("template");

    const formik = useFormik({
        onSubmit: async (values) => {
            setIsLoading(true);
            if (fileUrl) {
                toast.promise(
                    generateDocument({
                        values,
                        document_url: fileUrl,
                        handleCreateDocumentProps: {
                            toast,
                            session,
                            templateTitle,
                            coverLetterTemplate,
                            resumeTemplate,
                            onOpen: () => {},
                            router,
                        },
                    }),
                    {
                        success: {
                            title: "Success",
                            description:
                                "Document has been created successfully",
                        },
                        error: {
                            title: "Error",
                        },
                        loading: {
                            title: "Creating Document",
                            description:
                                "Your letter and resume are being populated, this can take a little time",
                        },
                    }
                );
                setIsLoading(false);
                // Just doing a console.log for now
            } else {
                setIsLoading(false);
                // toast.error("Please upload a resume");
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
                toast({
                    status: "error",
                    title: "Error",
                    description: error.response?.data?.error?.message,
                    duration: 9000,
                    isClosable: true,
                });
            } else {
                toast({
                    status: "error",
                    title: "Error",
                    description: "Something went wrong. Please try again",
                    duration: 9000,
                    isClosable: true,
                });
            }
        }
    };

    // const handleCreate = async (response: any) => {
    //     if (response.status == 200) {
    //         try {
    //             const data: any = await gqlQery(
    //                 singleUserPlan(session?.user.id as string),
    //                 session?.jwt as string
    //             );

    //             if (data?.usersPermissionsUser?.data.attributes.plan?.data) {
    //                 const { data } = await axios.post(
    //                     `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/user-documents`,
    //                     {
    //                         data: {
    //                             users_permissions_user: session?.user.id,
    //                             templateType: templateTitle,
    //                             template: {
    //                                 coverLetter: {
    //                                     previewImage:
    //                                         coverLetterTemplate.previewImage
    //                                             .data?.id,
    //                                     sections: {
    //                                         ...coverLetterTemplate.sections,
    //                                         heading: {
    //                                             ...coverLetterTemplate.sections
    //                                                 .heading,
    //                                             username:
    //                                                 response.coverletter?.find(
    //                                                     (item: any) =>
    //                                                         item.sectionTitle ===
    //                                                         "heading"
    //                                                 )?.username,
    //                                             contact: {
    //                                                 ...coverLetterTemplate
    //                                                     .sections?.heading
    //                                                     .contact,
    //                                                 phone: response.coverletter?.find(
    //                                                     (item: any) =>
    //                                                         item.sectionTitle ===
    //                                                         "heading"
    //                                                 )?.phone,
    //                                                 email: response.coverletter?.find(
    //                                                     (item: any) =>
    //                                                         item.sectionTitle ===
    //                                                         "heading"
    //                                                 )?.email,
    //                                             },
    //                                             professionalTitle:
    //                                                 response.coverletter?.find(
    //                                                     (item: any) =>
    //                                                         item.sectionTitle ===
    //                                                         "heading"
    //                                                 )?.professionalTitle,
    //                                         },
    //                                         opener: response.coverletter?.find(
    //                                             (item: any) =>
    //                                                 item.sectionTitle ===
    //                                                 "Opener"
    //                                         )?.content,

    //                                         body_1: response.coverletter?.find(
    //                                             (item: any) =>
    //                                                 item.sectionTitle ===
    //                                                 "Body 1"
    //                                         )?.content,
    //                                         body_2: response.coverletter?.find(
    //                                             (item: any) =>
    //                                                 item.sectionTitle ===
    //                                                 "Body 2"
    //                                         )?.content,
    //                                         body_3: response.coverletter?.find(
    //                                             (item: any) =>
    //                                                 item.sectionTitle ===
    //                                                 "Body 3"
    //                                         )?.content,
    //                                         conclusion:
    //                                             response.coverletter?.find(
    //                                                 (item: any) =>
    //                                                     item.sectionTitle ===
    //                                                     "Conclusion"
    //                                             )?.content,
    //                                         call_to_action:
    //                                             response.coverletter?.find(
    //                                                 (item: any) =>
    //                                                     item.sectionTitle ===
    //                                                     "Call To Action"
    //                                             )?.content,
    //                                     },
    //                                 },
    //                                 resume: {
    //                                     sections: {
    //                                         ...response.resume,
    //                                     },
    //                                     previewImage:
    //                                         resumeTemplate.previewImage.data
    //                                             ?.id,
    //                                 },
    //                             },
    //                         },
    //                     },
    //                     {
    //                         headers: {
    //                             Authorization: `Bearer ${session?.jwt}`,
    //                             "Content-Type": "application/json",
    //                         },
    //                     }
    //                 );
    //                 if (data) {
    //                     console.log(data);
    //                     console.log(data?.data?.id);
    //                     router.push(
    //                         `/dashboard/create-cover-letter/edit/${data?.data?.id}`
    //                     );
    //                 }
    //             } else {
    //                 setIsModalOpen(true);
    //             }
    //         } catch (error) {
    //             console.log(error);

    //             toast({
    //                 status: "error",
    //                 title: "Error",
    //                 description: "Something went wrong. Please try again",
    //                 duration: 9000,
    //                 isClosable: true,
    //             });
    //         }
    //     } else {
    //         console.log("response from ai is ", response);
    //         throw new Error();
    //     }
    // };

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
                            placeholder='Paste Company URL here'
                            id='company_url'
                        />
                    </div>

                    <div className='mt-[28px] w-full grid gap-[12px]'>
                        <p
                            className='text-base-secondary-text
                         text-[16px] font-[500] leading-[20px]'
                        >
                            Job Description
                        </p>
                        <textarea
                            style={{
                                boxShadow:
                                    "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                            }}
                            name='job_description'
                            placeholder='Paste the Job description here if instructed to'
                            className='w-full bg-white h-[138px] px-[14px] py-[16px]
                            rounded-[8px] border-[1px] border-gray-300 leading-[24px] outline-none text-[16px] font-inter text-gray-500'
                        ></textarea>
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

                    <PageButton
                        isLoading={isLoading}
                        variant='solid'
                        type='submit'
                        text='Create Cover'
                        className='mt-[40px] h-[61px] w-full text-white text-[24px] bg-base-primary-green'
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

export default GenerateDocumentPage;
