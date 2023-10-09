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
import { File } from "buffer";
import { updateUserAccount } from "@/lib/helpers";

interface Props {
    setOpenEdit: Dispatch<SetStateAction<boolean>>;
    openEdit: boolean;
    session?: Session | null;
}
export const EditDetailsModal = ({
    setOpenEdit,
    openEdit,
    session: serverSession,
}: Props) => {
    const { data: session, update } = useSession();
    const [isloading, setIsLoading] = useState(false);
    const [file, setFile] = useState<any>(null);

    const fileFormats = ["JPG", "PNG", "JPEG"];
    const handleFile = (file: any) => {
        // const blob = new Blob(file, {file.})
        setFile(file);
    };

    const formik = useFormik({
        initialValues: {
            first_name: serverSession?.user.first_name || "",
            last_name: serverSession?.user.last_name || "",
        },
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                // const formData = new FormData();
                // formData.append("files", file);

                // let profile_picture: string = "";
                // if (file) {
                //     const res: any = await fetch(
                //         `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/upload/`,
                //         {
                //             headers: {
                //                 Authorization: `Bearer ${session?.jwt}`,
                //                 // "Content-Type": "application/json",
                //             },
                //             body: formData,
                //             method: "POST",
                //         }
                //     );
                //     const data = await res.json();
                //     profile_picture = data[0].id;
                // }

                // const body = profile_picture
                //     ? {
                //           ...values,
                //           profile_picture,
                //       }
                //     : {
                //           ...values,
                //       };

                // const res = await fetch(
                //     `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/users/${session?.user.id}`,
                //     {
                //         headers: {
                //             Authorization: `Bearer ${session?.jwt}`,
                //             "Content-Type": "application/json",
                //         },
                //         body: JSON.stringify(body),
                //         method: "PUT",
                //     }
                // );

                // if (res.ok) {
                //     const { data: parsed_user_data } = await axios.get(
                //         `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/users/${session?.user.id}?populate=*`,
                //         {
                //             headers: {
                //                 Authorization: `Bearer ${session?.jwt}`,
                //             },
                //         }
                //     );
                //     await update({
                //         ...session,
                //         user: {
                //             first_name: parsed_user_data?.first_name,
                //             last_name: parsed_user_data?.last_name,
                //             profile_picture:
                //                 parsed_user_data?.profile_picture?.url,
                //         },
                //     });

                const user = await updateUserAccount({
                    jwt: session?.jwt as string,
                    user_id: session?.user.id as string,
                    file: file,
                    values,
                });

                if (user) {
                    await update({
                        ...session,
                        user: {
                            ...user,
                        },
                    });

                    formik.resetForm();
                    setFile(null);
                    setOpenEdit(false);

                    toast.success("Profile has been updated successfully");

                    setIsLoading(false);
                }
            } catch (error) {
                console.log(error);
                setIsLoading(false);
                toast.error("Something went wrong");
            }
        },
    });

    return (
        <Modal>
            <div
                onClick={() => !isloading && setOpenEdit(false)}
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
                            <div className='grid place-items-center cursor-pointer'>
                                <Image
                                    src={
                                        file
                                            ? URL.createObjectURL(file)
                                            : session?.user.profile_picture ||
                                              ""
                                    }
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
                        <div className='flex items-center gap-3 justify-between'>
                            <Button
                                className='mt-10 bg-red-500'
                                type='submit'
                                title='Delete Account'
                            />
                            <Button
                                isloading={isloading}
                                className='mt-10'
                                type='submit'
                                title='Update'
                            />
                        </div>
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
