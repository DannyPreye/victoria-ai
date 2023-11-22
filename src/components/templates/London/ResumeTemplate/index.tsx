import { GoDotFill } from "react-icons/go";
import React from "react";

import Image from "next/image";
import { ResumeSectionType, TemplateDocumentType } from "@/types/document";
import { Contact } from "../../components/Contact";
import { convertObjectToArray } from "@/utils/functions/converNumericObjectToArray";

interface Props {
    document: TemplateDocumentType;
}

const LondonResume = ({ document }: Props) => {
    const resume: ResumeSectionType = document.template.resume;
    const firstName = resume?.sections?.heading?.username
        ?.trim()
        ?.split(" ")[0];
    const lastName = resume?.sections?.heading?.username?.trim().split(" ")[1];

    console.log(resume.sections);
    const education = resume.sections.education
        ? convertObjectToArray(resume.sections.education)
        : [];
    const skills = resume.sections.skills
        ? convertObjectToArray(resume.sections.skills)
        : [];

    const workExperience = resume.sections.workExperience
        ? convertObjectToArray(resume.sections.workExperience)
        : [];

    return (
        <div className='flex min-h-screen'>
            <div
                style={{ borderRight: `5px solid black` }}
                className='w-[40%] bg-[#d7d5d5] p-12 flex flex-col gap-[150px]'
            >
                <div className=' flex flex-col gap-8'>
                    {/* Profile Picture */}
                    {document.addProfilePicture && (
                        <div className='w-[200px] relative overflow-hidden h-[200px] border-gray-500 border-[5px] rounded-full bg-gray-100 mx-auto'>
                            <Image
                                src={
                                    document.profilePicture.data?.attributes
                                        ?.url as string
                                }
                                fill
                                alt=''
                                className='object-fit'
                            />
                        </div>
                    )}
                    {/* Contact */}
                    <div className={``}>
                        <h2 className='text-gray-600 uppercase text-2xl font-semibold'>
                            Contact
                        </h2>
                        <Contact
                            contact={resume.sections.heading.contact}
                            color={document.color}
                        />
                    </div>
                </div>
                {/* Education */}
                <div className='flex flex-col gap-3'>
                    <h2 className='text-gray-600 uppercase text-2xl font-semibold'>
                        Education
                    </h2>
                    <div className='grid gap-4'>
                        {education.map((item, id) => (
                            <div key={id}>
                                <p className='font-bold text-[1.2rem] '>
                                    <span>{item?.school}</span> |{" "}
                                    <span>{item?.location || "Location"}</span>
                                </p>
                                <p className='text-gray-500 font-semibold'>
                                    {item?.courseOfStudy}
                                </p>
                                <p>{item?.endYear}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Skill */}
                <div className='flex flex-col gap-3'>
                    <h2 className='text-gray-600 uppercase text-2xl font-semibold'>
                        Skills
                    </h2>
                    <div className='grid gap-4'>
                        {skills.map((skill) => (
                            <div
                                className='flex items-center gap-8 text-gray-500'
                                key={skill}
                            >
                                <GoDotFill />
                                <span>{skill}</span>
                            </div>
                        ))}
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
                    <p>{resume?.sections.heading?.professionalTitle}</p>
                </div>

                {/* Professional Summary */}
                <div className='my-10 grid gap-3'>
                    <MainBodyHeading title='Profile' />
                    <p className='text-justify text-gray-500'>
                        {resume.sections.professionalSummary}
                    </p>
                </div>

                {/* Work Experience */}
                <div className='my-10 grid gap-3'>
                    <MainBodyHeading title='Work Experience' />

                    <div className=''>
                        {workExperience.map((experience, id) => (
                            <div
                                className='grid gap-4'
                                key={`experience_${id}`}
                            >
                                <div className='flex justify-between items-center font-bold text-gray-600'>
                                    <span className=''>
                                        {experience?.jobTitle || "Job Title"}
                                    </span>
                                    <span>
                                        {experience?.startYear} -{" "}
                                        {experience?.endYear || "Present"}
                                    </span>
                                </div>
                                <div className='pl-10 mt-5 text-gray-500'>
                                    {experience?.achivements?.map(
                                        (achievement: any) => (
                                            <div
                                                key={achievement}
                                                className='flex items-center gap-2'
                                            >
                                                <GoDotFill />{" "}
                                                <span>{achievement}</span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LondonResume;

const MainBodyHeading = ({ title }: { title: string }) => {
    return (
        <h2 className='text-gray-600 uppercase text-2xl font-semibold'>
            {title}
        </h2>
    );
};
