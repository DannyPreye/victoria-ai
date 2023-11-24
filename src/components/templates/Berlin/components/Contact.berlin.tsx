import React from "react";
import { ContactType } from "@/types/document";
import { IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { IconType } from "react-icons";
import { FaGithubAlt, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { TiSocialAtCircular } from "react-icons/ti";
import { FaAddressBook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
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
            case "address":
                return FaAddressBook;
            case "email":
                return MdEmail;
            default:
                return TiSocialAtCircular;
        }
    };

    const IconContact = ({ Icon, text }: { Icon: IconType; text: string }) => (
        <div className='grid grid-cols-4  w-full  py-2'>
            <span className='grid flex-shrink-0 place-items-center'>
                <Icon color='white' size={24} />
            </span>
            <span className='text-white col-span-3'>{text}</span>
        </div>
    );
    return (
        <div className='flex flex-col gap-2 my-5 w-full'>
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
