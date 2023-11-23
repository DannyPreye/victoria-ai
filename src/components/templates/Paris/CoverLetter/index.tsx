import React from "react";

import { TemplateDocumentType } from "@/types/document";
import { ParisHeading } from "../components/ParisHeading.paris";
import { ContactSection } from "../components/ContactSection";

interface Props {
    document: TemplateDocumentType;
}

const ParisCoverLetter = ({
    document: {
        template: { coverLetter },
        color,
        addProfilePicture,
        profilePicture,
    },
}: Props) => {
    const firstName = coverLetter?.sections?.heading?.username
        ?.trim()
        ?.split(" ")[0];
    const lastName = coverLetter?.sections?.heading?.username
        ?.trim()
        .split(" ")[1];

    return (
        <div className='flex min-h-screen relative overflow-hidden'>
            <ParisHeading
                username={coverLetter?.sections?.heading?.username}
                professionalTitle={
                    coverLetter?.sections?.heading?.professionalTitle
                }
            />
            {/* Contact Section */}
            <ContactSection
                color={color}
                addProfilePicture={addProfilePicture}
                profilePicture={profilePicture}
                heading={coverLetter.sections?.heading}
            >
                <div className='flex flex-col  items-center gap-3'>
                    <div>
                        <h3 className='text-gray-500 text-center text-[1.2rem] font-semibold'>
                            From
                        </h3>
                        <p className='font-bold'>
                            {coverLetter.sections?.heading?.username}
                        </p>
                    </div>
                    <div>
                        <h3 className='text-gray-500 text-[1.2rem] font-semibold'>
                            Date
                        </h3>
                    </div>
                </div>
            </ContactSection>

            {/* Main Body Section  */}
            <section className='w-[70%] bg-gray-100 px-12 py-16 pt-[300px]'>
                {/* Address */}
                <div className='my-10 flex flex-col items-end '>
                    <div className='flex flex-col items-end'>
                        <p className='font-bold text-gray-700'>To</p>
                        <p className='font-semibold text-gray-500'>
                            {coverLetter.sections.address["0"]["to"]}
                        </p>
                    </div>
                    <div>
                        <p className='font-bold text-gray-700'>Job Title</p>
                        <p className='font-semibold text-gray-500'>
                            {coverLetter.sections.address["0"]["jobTitle"]}
                        </p>
                    </div>
                    <p className=' text-gray-500'>
                        {coverLetter.sections.address["0"]["companyAddress"]}
                    </p>
                </div>

                {/* Greeting */}
                <div>
                    <p className='text-gray-500 font-bold'>
                        {coverLetter.sections.greetings}
                    </p>
                </div>

                {/* Body */}
                <div className='my-10 grid gap-10 text-justify'>
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

                <div className='mt-11 flex flex-col items-end'>
                    <p className='flex flex-col items-end'>
                        <span>{coverLetter.sections.signature} </span>
                        <span className='font-bold text-[1.2rem]'>
                            {coverLetter.sections.heading.username}
                        </span>
                    </p>
                </div>
            </section>
        </div>
    );
};

export default ParisCoverLetter;
