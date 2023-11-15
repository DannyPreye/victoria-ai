import React, { ReactNode } from "react";
import { DisplayTemplate } from "@/lib/types";
import { TemplateDocumentType } from "@/lib/types/document";

import { Contact } from "./Contact";

interface Props {
    document: TemplateDocumentType;
}

const LondonCoverLetter = ({
    document: {
        template: { coverLetter },
        color,
        addProfilePicture,
    },
}: Props) => {
    const firstName = coverLetter?.sections?.heading?.username
        ?.trim()
        ?.split(" ")[0];
    const lastName = coverLetter?.sections?.heading?.username
        ?.trim()
        .split(" ")[1];

    return (
        <div className='flex min-h-screen'>
            <div
                style={{ borderRight: `5px solid black` }}
                className='w-[40%] bg-[#d7d5d5] p-12 flex flex-col gap-[250px]'
            >
                <div className=' flex flex-col gap-8'>
                    {/* Profile Picture */}
                    {addProfilePicture && (
                        <div className='w-[200px] h-[200px] border-gray-500 border-[5px] rounded-full bg-gray-100 mx-auto'></div>
                    )}
                    <div className={``}>
                        <h2 className='text-gray-500 uppercase text-2xl font-semibold'>
                            Contact
                        </h2>
                        <Contact
                            contact={coverLetter.sections.heading.contact}
                            color={color}
                        />
                    </div>
                </div>

                <div className='flex flex-col gap-3'>
                    <div>
                        <h3 className='text-gray-500 text-[1.2rem] font-semibold'>
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
            </div>
            <div className='w-[70%] bg-gray-100 px-12 py-16 '>
                {/* Heading */}
                <div className='py-5 border-b-[5px] border-gray-400 grid gap-4'>
                    <h1
                        style={{ color: "black" }}
                        className={`font-bold text-4xl uppercase  flex gap-2 `}
                    >
                        <span>{firstName}</span>
                        <span className='text-gray-500'>{lastName}</span>
                    </h1>
                    <p>{coverLetter?.sections.heading?.professionalTitle}</p>
                </div>
                {/* Address */}
                <div className='my-10'>
                    <div>
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
    );
};

export default LondonCoverLetter;
