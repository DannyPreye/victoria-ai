import React from "react";
import { ContactType } from "@/lib/types/document";
import { IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { IconType } from "react-icons";
import { FaGithubAlt, FaLinkedinIn, FaFacebookF } from "react-icons/fa";

interface ContactProps {
    contact: ContactType;
    color: string;
}
export const Contact = ({ contact, color }: ContactProps) => {
    const checkIcon = (name: string): IconType => {
        name = name.toLowerCase();

        switch (name) {
            case "github":
                return FaGithubAlt;
            case "facebook":
                return FaFacebookF;
            case "linkedin":
                return FaLinkedinIn;
            default:
                return FaLinkedinIn;
        }
    };
    const IconContact = ({ Icon, text }: { Icon: IconType; text: string }) => (
        <div className='flex items-center gap-5'>
            <span
                style={{ backgroundColor: "black" }}
                className='w-8 h-8 rounded-full grid flex-shrink-0 place-items-center'
            >
                <Icon color='white' />
            </span>
            <span className='text-gray-500'>{text}</span>
        </div>
    );

    return (
        <div className='flex flex-col gap-2 my-5 w-[250px]'>
            <IconContact Icon={IoMail} text={contact.email} />
            <IconContact Icon={FaPhoneAlt} text={contact.phone} />
            {typeof contact.socialLinks === "object" &&
                Object.keys(contact.socialLinks["0"]).map((item) => (
                    <IconContact
                        key={item}
                        Icon={checkIcon(item)}
                        text={contact.socialLinks["0"][item]}
                    />
                ))}
        </div>
    );
};
