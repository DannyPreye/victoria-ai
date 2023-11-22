import React, { ReactNode } from "react";

import Image from "next/image";

import { TemplateDocumentType } from "@/types/document";
import { Contact } from "../components/Contact.paris";

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
            <div className='h-[300px] absolute flex justify-end -left-5 px-8 py-10 -top-11 rotate-[4deg] bg-black w-[120%]'></div>
            <div className='absolute flex justify-end text-white right-0  w-full px-8 top-[6%] flex-col items-end '>
                <h1
                    style={{ color: "white" }}
                    className={`font-bold text-5xl uppercase   flex gap-2 `}
                >
                    {coverLetter?.sections?.heading?.username}
                </h1>
                <p className='tracking-2'>
                    {coverLetter?.sections.heading?.professionalTitle}
                </p>
            </div>
            {/* Contact Section */}
            <section className='w-[40%] bg-[rgb(227,225,225)] p-12 flex flex-col pt-[300px] gap-[250px]'>
                <div className=' flex flex-col gap-8'>
                    {/* Profile Picture */}
                    {addProfilePicture && (
                        <div className='w-[200px] h-[200px] relative border-gray-700 border-[5px] overflow-hidden rounded-full bg-gray-100 mx-auto'>
                            <Image
                                src={
                                    profilePicture.data?.attributes
                                        ?.url as string
                                }
                                fill
                                alt=''
                                className='object-fit'
                            />
                        </div>
                    )}
                    <div className={``}>
                        <h2 className='text-gray-500 border-black uppercase text-center border-b-2 text-2xl font-semibold'>
                            Contact
                        </h2>
                        <div className='flex flex-col items-center w-[80%] mx-auto'>
                            <Contact
                                contact={coverLetter.sections.heading.contact}
                                color={color}
                            />
                        </div>
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
            </section>

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
                    <p className='flex flex-col'>
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
