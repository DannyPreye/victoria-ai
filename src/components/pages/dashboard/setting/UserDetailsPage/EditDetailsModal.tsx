"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "@/components/shared/Modal";
import { IconType } from "react-icons";
import { Session } from "next-auth";
import { FileUploader } from "react-drag-drop-files";
import Image from "next/image";
import { useFormik } from "formik";
import Button from "@/components/pages/auth/Shared/Button";
import { signOut, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { deleteUserAccount, updateUserAccount } from "@/lib/helpers";
import { useRouter } from "next/navigation";

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
    const router = useRouter();
    const fileFormats = ["JPG", "PNG", "JPEG"];
    const handleFile = (file: any) => {
        setFile(file);
    };
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const formik = useFormik({
        initialValues: {
            first_name: serverSession?.user.first_name as string,
            last_name: serverSession?.user.last_name as string,
        },
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

    const handleDeleteAccount = async () => {
        try {
            const res: any = await deleteUserAccount({
                user_id: session?.user.id as string,
                jwt: session?.jwt as string,
            });
            if (res?.data) {
                await signOut();
                router.push("/auth/sign-up");
            }
        } catch (error) {}
    };

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
                handleDeleteAccount={handleDeleteAccount}
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

interface DeleteModalProps {
    setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
    openDeleteModal: boolean;
    handleDeleteAccount: () => Promise<void>;
}
const DeleteModal = ({
    setOpenDeleteModal,
    openDeleteModal,
    handleDeleteAccount,
}: DeleteModalProps) => {
    return (
        <Modal>
            <div
                className={`fixed z-[200] left-0 top-0 w-screen h-screen bg-[#00000036] backdrop-blur-sm place-items-center  justify-center items-center duration-700 ${
                    openDeleteModal ? "flex" : "hidden"
                } items-start`}
                onClick={() => setOpenDeleteModal(false)}
            >
                <div onClick={(e)=>e.stopPropagation()} className='w-[80%] grid place-items-center gap-5 max-w-[450px] h-[200px] bg-white rounded-md p-4'>
                    <p>Are you sure you want to delete your account ? </p>
                    <div className='flex justify-between gap-8 items-center '>
                        <Button
                            title='Cancel'
                            onClick={() => setOpenDeleteModal(false)}
                            className='px-2'
                        />

                        <Button
                            onClick={handleDeleteAccount}
                            className='px-2'
                            title='Delete'
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
};
