"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "@/components/shared/Modal";
import { IconType } from "react-icons";
import { Session } from "next-auth";
import { FileUploader } from "react-drag-drop-files";
import Image from "next/image";
import { useFormik } from "formik";
import axios from "axios";
import Button from "@/components/pages/auth/Shared/Button";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

interface Props {
    setOpenEdit: Dispatch<SetStateAction<boolean>>;
    openEdit: boolean;
    session?: Session | null;
}
export const EditDetailsModal = ({ setOpenEdit, openEdit }: Props) => {
    const { data: session, update } = useSession();
    const [isloading, setIsLoading] = useState(false);

    const fileFormats = [""];
    const handleFile = () => {};

    console.log(session?.user);

    const formik = useFormik({
        initialValues: {
            first_name: session?.user?.first_name || "",
            last_name: session?.user.last_name,
        },
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                const res: any = await fetch(
                    `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/users/${session?.user.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${session?.jwt}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            ...values,
                        }),
                        method: "PUT",
                    }
                );
                const data = await res.json();
                console.log(data);
                setIsLoading(false);

                if (data) {
                    await update({
                        ...session,
                        user: {
                            first_name: data?.first_name,
                            last_name: data?.last_name,
                        },
                    });

                    formik.resetForm();
                    setOpenEdit(false);

                    toast.success("Profile has been updated successfully");
                }
            } catch (error) {
                console.log(error);
                setIsLoading(false);
                toast.error("Something went wrong");
            }
        },
    });

    useEffect(() => {
        formik.initialValues = {
            first_name: session?.user.first_name || "",
            last_name: session?.user.last_name || "",
        };
    }, [session?.user.id]);
    return (
        <Modal>
            <div
                onClick={() => setOpenEdit(false)}
                className={`fixed  left-0 top-0 w-screen h-screen bg-[#00000036] backdrop-blur-sm place-items-center  justify-center items-center duration-700 ${
                    openEdit ? "flex" : "hidden"
                } items-start`}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className='bg-white  flex-1 py-[24px] px-5 max-w-[450px] min-h-[450px] w-[90%]'
                >
                    <form onSubmit={formik.handleSubmit}>
                        <FileUploader
                            name='file'
                            maxSize={10}
                            handleChange={handleFile}
                            types={fileFormats}
                            classes='w-full py-3'
                        >
                            <div className='grid place-items-center'>
                                <Image
                                    src={session?.user.profile_picture || ""}
                                    alt={session?.user.first_name || ""}
                                    width={200}
                                    height={200}
                                />
                            </div>
                        </FileUploader>
                        <div className='mt-[48px] grid gap-[32px]'>
                            <InputElement
                                onChange={formik.handleChange}
                                label='First Name'
                                placeholder='Enter your first name'
                                id='first_name'
                                value={formik.values.first_name as string}
                            />
                            <InputElement
                                onChange={formik.handleChange}
                                label='Last Name'
                                placeholder='Enter your last name'
                                id='last_name'
                                value={formik.values.last_name as string}
                            />
                        </div>
                        <Button
                            isloading={isloading}
                            className='mt-10'
                            type='submit'
                            title='Update'
                        />
                    </form>
                </div>
            </div>
        </Modal>
    );
};

interface InputProps {
    label: string;
    placeholder: string;
    Icon?: IconType;
    id: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const InputElement = ({
    label,
    placeholder,
    Icon,
    id,
    value,
    onChange,
}: InputProps) => {
    return (
        <div className='grid gap-[12px] w-full'>
            <label
                className='text-base-secondary-text text-[16px] font-[500] leading-[20px]'
                htmlFor={id}
            >
                {label}
            </label>
            <div
                className='border-[1px] rounded-[8px] py-[16px] px-[14px]
            flex items-center gap-[12px] text-gray-500 text-[16px]
            font-[400] w-full leading-[24px] font-inter'
            >
                {Icon && <Icon size={20} />}
                <input
                    onChange={onChange}
                    value={value}
                    type='text'
                    placeholder={placeholder}
                    id={id}
                    className='flex-1 bg-transparent border-none outline-none'
                />
            </div>
        </div>
    );
};
