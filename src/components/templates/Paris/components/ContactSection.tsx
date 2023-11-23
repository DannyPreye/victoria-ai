import React, { ReactNode } from "react";
import Image from "next/image";
import { Contact } from "./Contact.paris";
import MainBodyHeading from "./MainBodyHeading";

interface ContactSectionProps {
    children: ReactNode;
    heading: any;
    profilePicture: any;
    addProfilePicture: boolean;
    color: string;
}
export const ContactSection = ({
    children,
    color,
    heading,
    profilePicture,
    addProfilePicture,
}: ContactSectionProps) => {
    return (
        <section className='w-[40%] bg-[rgb(227,225,225)] p-12 flex flex-col pt-[300px] gap-[250px]'>
            <div className=' flex flex-col gap-8'>
                {/* Profile Picture */}
                {addProfilePicture && (
                    <div className='w-[200px] h-[200px] relative border-gray-700 border-[5px] overflow-hidden rounded-full bg-gray-100 mx-auto'>
                        <Image
                            src={profilePicture.data?.attributes?.url as string}
                            fill
                            alt=''
                            className='object-fit'
                        />
                    </div>
                )}
                <div className={``}>
                    <MainBodyHeading title='Contact' />
                    <div className='flex text-gray-700 flex-col items-center w-[80%] mx-auto'>
                        <Contact contact={heading?.contact} color={color} />
                    </div>
                </div>
            </div>

            {children}
        </section>
    );
};
