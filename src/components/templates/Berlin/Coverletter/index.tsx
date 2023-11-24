import { TemplateDocumentType } from "@/types/document";
import React from "react";
import MainHeading from "../components/MainHeading.berlin";
import ContactSection from "../components/ContactSection.berlin";

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
            <MainHeading
                professionalTitle={
                    coverLetter.sections?.heading?.professionalTitle
                }
                username={coverLetter.sections?.heading?.username}
                color={color}
                addProfilePicture={addProfilePicture}
                profilePicture={profilePicture.data?.attributes?.url as string}
            />
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
            <div className='w-[40%] bg-black pt-[320px]'>
                <ContactSection
                    heading={coverLetter.sections?.heading}
                    addProfilePicture={addProfilePicture}
                    color={color}
                    profilePicture={profilePicture}
                >
                    <div></div>
                </ContactSection>
            </div>
        </div>
    );
};

export default BerlinCoverletter;
