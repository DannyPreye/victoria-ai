import { GoDotFill } from "react-icons/go";
import React from "react";

import Image from "next/image";
import { ResumeSectionType, TemplateDocumentType } from "@/types/document";
import { Contact } from "../../components/Contact";
import { convertObjectToArray } from "@/utils/functions/converNumericObjectToArray";
import SectionHeading from "../components/SectionHeading.amsterdam";
import ContactSection from "../components/ContactSection.amsterdam";
import MainHeading from "../components/MainHeading.amsterdam";

interface Props {
    document: TemplateDocumentType;
}

const AmsterdamResume = ({ document }: Props) => {
    const resume: ResumeSectionType = document.template.resume;
    const firstName = resume?.sections?.heading?.username
        ?.trim()
        ?.split(" ")[0];
    const lastName = resume?.sections?.heading?.username?.trim().split(" ")[1];

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
            <div className='w-[40%] bg-[#f2f0f0]  flex flex-col gap-[150px]'>
                {/* Contact */}
                <ContactSection
                    color={document.color}
                    addProfilePicture={document.addProfilePicture}
                    profilePicture={document.profilePicture}
                    heading={resume.sections?.heading}
                >

                        {/* Education */}
                        <div className='flex flex-col gap-3'>
                            <SectionHeading title='Eductation' />
                            <div className='grid gap-4'>
                                {education.map((item, id) => (
                                    <div key={id}>
                                        <p className='font-bold text-[1.2rem] '>
                                            <span>{item?.school}</span> |{" "}
                                            <span>
                                                {item?.location || "Location"}
                                            </span>
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
                            <SectionHeading title='Skills' />
                            <div className='grid gap-4'>
                                {skills.map((skill) => (
                                    <div
                                        className='flex items-center gap-8 text-gray-500'
                                        key={skill}
                                    >
                                        <GoDotFill size={18} />
                                        <span>{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                </ContactSection>
            </div>
            <div className='w-[70%] bg-gray-100 px-12 py-16 '>
                {/* Heading */}
                <MainHeading
                    professionalTitle={
                        resume?.sections.heading?.professionalTitle
                    }
                    firstName={firstName}
                    lastName={lastName}
                    color={document.color}
                />

                {/* Professional Summary */}
                <div className='my-10 grid gap-3'>
                    <SectionHeading title='Profile' />
                    <p className='text-justify font-exo text-gray-500'>
                        {resume.sections.professionalSummary}
                    </p>
                </div>

                {/* Work Experience */}
                <div className='my-10 grid gap-3'>
                    <SectionHeading title='Work Experience' />

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

export default AmsterdamResume;
