import { GoDotFill } from "react-icons/go";
import React from "react";

import { ResumeSectionType, TemplateDocumentType } from "@/types/document";

import { convertObjectToArray } from "@/utils/functions/converNumericObjectToArray";
import { ParisHeading } from "../components/ParisHeading.paris";
import { ContactSection } from "../components/ContactSection";

interface Props {
    document: TemplateDocumentType;
}

const ParisResume = ({ document }: Props) => {
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
        <div className='flex min-h-screen relative overflow-hidden'>
            <ParisHeading
                username={resume?.sections?.heading?.username}
                professionalTitle={resume?.sections?.heading?.professionalTitle}
            />
            {/* Contact Section */}
            <ContactSection
                color={document.color}
                addProfilePicture={document.addProfilePicture}
                profilePicture={document.profilePicture}
                heading={resume.sections?.heading}
            >
                {/* Education */}
                <div className={``}>
                    <h2 className='text-gray-500 border-black uppercase mx-auto w-[80%] text-center border-b-[1px] text-2xl font-semibold'>
                        Eductaion
                    </h2>
                    <div className='flex flex-col items-center w-[80%] mx-auto'>
                        {education.map((item, id) => (
                            <div
                                className='flex flex-col items-center'
                                key={id}
                            >
                                <h3 className='font-bold text-gray-700 text-[1.2rem] '>
                                    <span>{item?.school}</span> |{" "}
                                    <span>{item?.location || "Location"}</span>
                                </h3>
                                <p className='text-gray-500 font-semibold'>
                                    {item?.courseOfStudy}
                                </p>
                                <p className='text-gray-800'>{item?.endYear}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/*SKILLS  */}
                <div className={``}>
                    <h2 className='text-gray-500 border-black uppercase mx-auto w-[80%] text-center border-b-[1px] text-2xl font-semibold'>
                        Skills
                    </h2>
                    <div className='flex flex-col gap-2 items-center w-[80%] mt-4 mx-auto'>
                        {skills.map((skill, id) => (
                            <p key={id}>{skill}</p>
                        ))}
                    </div>
                </div>
            </ContactSection>

            {/* Main Body Section  */}
            <section className='w-[70%] bg-gray-100 px-12 py-16 pt-[300px]'>
                <div className={``}>
                    <h2 className='text-gray-500  border-black uppercase mx-auto mt-5  text-center border-b-[1px] text-2xl font-semibold'>
                        About Me
                    </h2>
                    <div className='flex flex-col gap-2 text-gray-500 leading-[140%] text-justify items-center  mt-4 mx-auto'>
                        {resume.sections.professionalSummary}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ParisResume;

const MainBodyHeading = ({ title }: { title: string }) => {
    return (
        <h2 className='text-gray-600 uppercase text-2xl font-semibold'>
            {title}
        </h2>
    );
};
