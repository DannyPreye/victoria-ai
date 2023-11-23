import { GoDotFill } from "react-icons/go";
import React from "react";

import { ResumeSectionType, TemplateDocumentType } from "@/types/document";

import { convertObjectToArray } from "@/utils/functions/converNumericObjectToArray";
import { ParisHeading } from "../components/ParisHeading.paris";
import { ContactSection } from "../components/ContactSection";
import MainBodyHeading from "../components/MainBodyHeading";

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
        <div className='flex min-h-screen relative overflow-hidden font-lato'>
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
                    <MainBodyHeading title='Education' />
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
                    <MainBodyHeading title='Skills' />
                    <div className='flex font-lato  flex-col gap-2 items-center w-[80%] mt-4 mx-auto'>
                        {skills.map((skill, id) => (
                            <p key={id}>{skill}</p>
                        ))}
                    </div>
                </div>
            </ContactSection>

            {/* Main Body Section  */}
            <section className='w-[70%]  bg-gray-100 px-12 py-16 pt-[300px]'>
                <div className={``}>
                    <MainBodyHeading title='About Me' />
                    <div className='flex flex-col gap-2  text-gray-500 leading-[140%] text-justify items-center  mt-5 mx-auto'>
                        {resume.sections.professionalSummary}
                    </div>
                </div>
                <div className={`mt-4`}>
                    <MainBodyHeading title='Work Experience' />
                    <div className='flex flex-col gap-2 text-gray-500 leading-[140%] text-justify items-center  mt-5 mx-auto'>
                        {workExperience.map((experience, id) => (
                            <div key={`experience_${id}`}>
                                <p className='text-gray-600 font-bold'>
                                    Job Position
                                </p>
                                <p className='font-lato font-[400] text-black italic'>
                                    {experience?.companyName || "Company name"},{" "}
                                    {experience?.location || "Location"} /{" "}
                                    {experience?.startYear} -{" "}
                                    {experience?.endYear}
                                </p>
                                <ul className='pl-8'>
                                    {experience?.achievement?.map(
                                        (achievement: any) => (
                                            <li key={achievement}>
                                                {achievement}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ParisResume;
