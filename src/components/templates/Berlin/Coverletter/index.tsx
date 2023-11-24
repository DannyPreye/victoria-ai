import { TemplateDocumentType } from "@/types/document";
import React from "react";

interface Props {
    document: TemplateDocumentType;
}

const BerlinCoverletter = ({
    document: {
        template: { coverLetter },
        color,
        addProfilePicture,
        profilePicture,
    },
}: Props) => {
    return (
        <div className='flex min-h-screen relative'>
            <div className='absolute top-[5%] gap-3 grid place-items-center uppercase border-b-[3px] py-7 bg-white border-t-[3px] border-black w-full '>
                <h1 className='font-bold text-6xl'>
                    {coverLetter?.sections?.heading?.username}
                </h1>
                <p className='tracking-widest uppercase'>
                    {coverLetter?.sections?.heading?.professionalTitle}
                </p>
            </div>
            <div className='w-[70%] bg-gray-100 pt-[320px] pb-4 px-8'>
                {/* Address */}
                <div>
                    <p>Type Date here</p>
                    <div className='my-5'>
                        <div>
                            <p className='font-semibold text-gray-500'>
                                {coverLetter.sections.address["0"]["to"]}
                            </p>
                        </div>
                        <div>
                            <p className='font-semibold text-gray-500'>
                                {coverLetter.sections.address["0"]["jobTitle"]}
                            </p>
                        </div>
                        <p className=' text-gray-500'>
                            {
                                coverLetter.sections.address["0"][
                                    "companyAddress"
                                ]
                            }
                        </p>
                    </div>
                </div>
                {/* Greeting */}
                <div className='pt-6'>
                    <p className='text-gray-500 font-bold'>
                        {coverLetter.sections.greetings}
                    </p>
                </div>

                {/* Body  */}
                <div>
                    <div className='py-10 grid gap-10 text-justify'>
                        <p className='text-gray-500'>
                            {coverLetter.sections.opener}
                        </p>
                        <p className='text-gray-500'>
                            {coverLetter.sections.body_1}
                        </p>
                        <p className='text-gray-500'>
                            {coverLetter.sections.body_2}
                        </p>
                        <p className='text-gray-500'>
                            {coverLetter.sections.body_3}
                        </p>
                        <p className='text-gray-500'>
                            {coverLetter.sections.conclusion}
                        </p>
                        <p className='text-gray-500'>
                            {coverLetter.sections.call_to_action} <br />
                            <br />
                            Sincerely
                        </p>
                    </div>

                    <div className='mt-11'>
                        <p className='flex flex-col'>
                            <span>{coverLetter.sections.signature} </span>
                            <span className='font-bold text-[1.2rem]'>
                                {coverLetter.sections.heading.username}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className='w-[40%] bg-black pt-[320px]'></div>
        </div>
    );
};

export default BerlinCoverletter;
