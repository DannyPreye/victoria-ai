import React, { ReactNode } from "react";
import Image from "next/image";
import { Contact } from "./Contact.paris";

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
                    <h2 className='text-gray-500 border-black uppercase mx-auto w-[80%] text-center border-b-2 text-2xl font-semibold'>
                        Contact
                    </h2>
                    <div className='flex flex-col items-center w-[80%] mx-auto'>
                        <Contact contact={heading?.contact} color={color} />
                    </div>
                </div>
            </div>

            {children}
        </section>
    );
};
