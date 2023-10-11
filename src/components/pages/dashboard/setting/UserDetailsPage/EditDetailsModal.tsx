"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "@/components/shared/Modal";
import { IconType } from "react-icons";
import { Session } from "next-auth";
import { FileUploader } from "react-drag-drop-files";
import Image from "next/image";
import { useFormik } from "formik";
import Button from "@/components/pages/auth/Shared/Button";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { updateUserAccount } from "@/lib/helpers";
import { DeleteModal } from "./DeleteModal";

interface Props {
    setOpenEdit: Dispatch<SetStateAction<boolean>>;
    openEdit: boolean;
    session?: Session | null;
}
export const EditDetailsModal = ({ setOpenEdit, openEdit }: Props) => {
    const { data: session, update } = useSession();
    const [isloading, setIsLoading] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [file, setFile] = useState<any>(null);
    const [initialValues, setInitialValues] = useState({
        first_name: session?.user.first_name as string,
        last_name: session?.user.last_name as string,
    });

    const fileFormats = ["JPG", "PNG", "JPEG"];

    const handleFile = (file: any) => {
        setFile(file);
    };

    // Resets the initial values when theres is a change in the user details
    useEffect(() => {
        setInitialValues({
            first_name: session?.user.first_name as string,
            last_name: session?.user.last_name as string,
        });
    }, [session?.user.first_name, session?.user.last_name]);

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                const user = await updateUserAccount({
                    jwt: session?.jwt as string,
                    user_id: session?.user.id as string,
                    file: file,
                    values,
                });

                if (user) {
                    // Updates the user
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
                setIsLoading(false);
                toast.error("Something went wrong");
            }
        },
    });

    return (
        <Modal>
            <div
                onClick={() => {
                    !isloading && setOpenEdit(false);
                    setFile(null);
                }}
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
                            <div className='grid place-items-center mx-auto h-[160px] relative w-[160px]  cursor-pointer'>
                                <Image
                                    src={
                                        file
                                            ? URL.createObjectURL(file)
                                            : session?.user.profile_picture ||
                                              "https://agcnwo.com/wp-content/uploads/2020/09/avatar-placeholder.png"
                                    }
                                    alt={session?.user.first_name || ""}
                                    fill
                                    className='object-contain'
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
                                title='Delete Account'
                                type='button'
                                onClick={() => setOpenDeleteModal(true)}
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
            <DeleteModal
                openDeleteModal={openDeleteModal}
                setOpenDeleteModal={setOpenDeleteModal}
            />
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
