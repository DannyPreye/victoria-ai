"use client";
import React, { useState } from "react";
import { IconType } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { VscKey } from "react-icons/vsc";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useToast } from "@chakra-ui/react";
import PageButton from "@/components/Button.components";

const SecurityPage = () => {
    const { data: session, update } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const validationSchema = yup.object({
        currentPassword: yup.string().required("Current password is required"),
        password: yup
            .string()
            .min(8, "Password must be at least 8 characters."),
        passwordConfirmation: yup
            .string()
            .oneOf([yup.ref("password")], "Passwords must match")
            .required("Confirm password field is required"),
    });

    const formik = useFormik({
        initialValues: {
            currentPassword: "",
            password: "",
            passwordConfirmation: "",
        },
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                const { data } = await axios.post(
                    `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/auth/change-password`,
                    values,
                    {
                        headers: {
                            Authorization: `Bearer ${session?.jwt}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                setIsLoading(false);
                if (data) {
                    await update({
                        ...session,
                        jwt: data?.jwt,
                    });

                    formik.resetForm();
                    toast({
                        status: "success",
                        title: "Password Change",
                        description: "Password has successfully been changed",
                        duration: 9000,
                        isClosable: true,
                    });
                }
            } catch (error) {
                console.log(error);
                setIsLoading(false);
                if (axios.isAxiosError(error)) {
                    toast({
                        status: "error",
                        title: "Error",
                        description: error.response?.data?.error?.message,
                        duration: 9000,
                        isClosable: true,
                    });
                } else {
                    toast({
                        status: "error",
                        title: "Error",
                        description: "Something went wrong. Please try again",
                        duration: 9000,
                        isClosable: true,
                    });
                }
            }
        },
        validationSchema,
    });

    return (
        <div className='pb-[117px] lg:pb-0'>
            <div className='flex flex-col gap-[24px] lg:flex-row lg:justify-between'>
                <div className='text-base-secondary-text'>
                    <h1 className='font-[600] text-[30px] leading-[42px]  '>
                        Security
                    </h1>
                    <p className='font-inter text-[14px] leading-[20px] font-[400]'>
                        Lorem ipsum dolor sit ametis ipsum dolor sit ametis
                    </p>
                </div>
            </div>

            <form
                onSubmit={formik.handleSubmit}
                className='mt-[48px] grid gap-[32px]'
            >
                <InputElement
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.currentPassword}
                    Icon={VscKey}
                    id='currentPassword'
                    placeholder='Enter Current Password'
                    label='Current Password'
                    isError={
                        formik.touched.currentPassword &&
                        Boolean(formik.errors.currentPassword)
                    }
                    errorMessage={formik.errors.currentPassword}
                />
                <InputElement
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    Icon={VscKey}
                    id='password'
                    placeholder='Enter New Password'
                    label='New Password'
                    isError={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                    }
                    errorMessage={formik.errors.password}
                />
                <InputElement
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.passwordConfirmation}
                    Icon={VscKey}
                    id='passwordConfirmation'
                    placeholder='Confirm New Password'
                    label='Confirm New Password'
                    isError={
                        formik.touched.passwordConfirmation &&
                        Boolean(formik.errors.passwordConfirmation)
                    }
                    errorMessage={formik.errors.passwordConfirmation}
                />
                <div className='flex justify-end items-center gap-[24px] '>
                    <PageButton
                        onClick={() => formik.resetForm()}
                        text='Cancel'
                        type='button'
                        variant='outline'
                        className='h-[54px]'
                    />
                    <PageButton
                        variant='solid'
                        isLoading={isLoading}
                        text='Save'
                        type='submit'
                    />
                </div>
            </form>
        </div>
    );
};
export default SecurityPage;

interface InputProps {
    label: string;
    placeholder: string;
    Icon: IconType;
    id: string;
    value: string | undefined;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
    isError?: boolean;
    errorMessage?: string | undefined;
    onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
}
const InputElement = ({
    label,
    placeholder,
    Icon,
    id,
    onChange,
    value,
    isError,
    errorMessage,
    onBlur,
}: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);
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
                <Icon size={20} />
                <input
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    id={id}
                    className='flex-1 bg-transparent border-none outline-none'
                />
                <div
                    className='text-[1.3rem] cursor-pointer'
                    onClick={() => setShowPassword((prev) => !prev)}
                >
                    {showPassword ? (
                        <AiOutlineEyeInvisible />
                    ) : (
                        <AiOutlineEye />
                    )}
                </div>
            </div>
            {isError && errorMessage && (
                <p className='text-red-500 font-inter text-[12px] '>
                    {errorMessage}
                </p>
            )}
        </div>
    );
};
