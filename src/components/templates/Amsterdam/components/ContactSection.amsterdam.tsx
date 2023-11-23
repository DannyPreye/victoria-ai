import Image from "next/image";
import React, { ReactNode } from "react";
import { Contact } from "./Contact.amsterdam";
import SectionHeading from "./SectionHeading.amsterdam";

interface ContactSectionProps {
    children: ReactNode;
    heading: any;
    profilePicture: any;
    addProfilePicture: boolean;
    color: string;
}

const ContactSection = ({
    addProfilePicture,
    profilePicture,
    color,
    heading,
    children,
}: ContactSectionProps) => {
    return (
        <div className=' flex flex-col gap-8 pt-20'>
            {/* Profile Picture */}

            <div className='relative w-full '>
                <div className='w-[200px] z-10 relative overflow-hidden h-[200px] border-gray-500 border-[1px] rounded-full bg-gray-100 mx-auto'>
                    {addProfilePicture ? (
                        <Image
                            src={
                                profilePicture?.data?.attributes?.url as string
                            }
                            fill
                            alt=''
                            className='object-fit'
                        />
                    ) : (
                        <></>
                    )}
                </div>
                <div className='absolute h-10 border-t-4 border-b-4 bg-white flex flex-col gap-5 w-full top-[50%] translate-y-[-50%]'></div>
            </div>
            <div className='p-12'>
                {/* Contact */}
                <div className={``}>
                    <SectionHeading title='Contact' />
                    <Contact contact={heading.contact} color={color} />
                </div>
                {children}
            </div>
        </div>
    );
};

export default ContactSection;
