import Image from "next/image";
import React, { ReactNode } from "react";
import { Contact } from "./Contact.berlin";

interface ContactSectionProps {
    children: ReactNode;
    heading: any;
    profilePicture: any;
    addProfilePicture: boolean;
    color: string;
}

//

const ContactSection = ({
    addProfilePicture,
    profilePicture,
    color,
    heading,
    children,
}: ContactSectionProps) => {
    return (
        <div className=' flex flex-col gap-8  px-3'>
            <div className=' grid gap-10'>
                {/* Contact */}
                <div className={``}>
                    <Contact contact={heading.contact} color={color} />
                </div>
                {children}
            </div>
        </div>
    );
};

export default ContactSection;
