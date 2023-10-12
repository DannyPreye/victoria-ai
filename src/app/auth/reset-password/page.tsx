"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import InputElement from "@/components/pages/auth/Shared/InputElement";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/pages/auth/Shared/Button";
import axios from "axios";
import { toast } from "react-toastify";

const Page = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const email = useSearchParams().get("email");
    const code = useSearchParams().get("code");
    const validationSchema = yup.object({
        newPassword: yup
            .string()
            .min(8, "Password must be at least 8 characters."),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("newPassword")], "Passwords must match")
            .required("Confirm password field is required"),
    });

    const formik = useFormik({
        initialValues: {
            newPassword: "",
            confirmPassword: "",
        },
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                const { data } = await axios.post(
                    `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/reset-password`,
                    {
                        email,
                        code,
                        newPassword: values.newPassword,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                setIsLoading(false);
                console.log(data);
                if (data) {
                    router.push("/auth/sign-in");
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    toast.error(error.response?.data.error.message);
                } else {
                    toast.error("Something went wrong. Please try again");
                }
                setIsLoading(false);
            }
        },
        validationSchema,
    });

    console.log(formik.errors);
    return (
        <div className='h-screen grid place-items-center p-[16px]'>
            <div className='border-2 px-4 py-6 rounded-md shadow-md w-full max-w-[450px] '>
                <div className='flex flex-col items-center gap-3 '>
                    <Image
                        src={"/instaLetter-logo.png"}
                        alt='instaletter'
                        width={120}
                        height={120}
                    />
                    <h1 className='text-center  gap-3 font-inter text-lg lg:text-2xl text-base-secondary-text font-bold my-3 '>
                        Reset Password
                    </h1>
                </div>

                <form
                    onSubmit={formik.handleSubmit}
                    className='flex flex-col gap-3 py-3'
                >
                    <InputElement
                        value={formik.values.newPassword}
                        required
                        id='newPassword'
                        onChange={formik.handleChange}
                        type='password'
                        className='w-full lg:col-span-1 col-span-2'
                        label='New Password'
                        moreInfo='Must be at least 8 characters.'
                        onBlur={formik.handleBlur}
                        isError={
                            formik.touched.newPassword &&
                            Boolean(formik.errors.newPassword)
                        }
                        errorMessage={formik.errors.newPassword}
                    />
                    <InputElement
                        value={formik.values.confirmPassword}
                        required
                        type='password'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id='confirmPassword'
                        className='w-full lg:col-span-1 col-span-2 '
                        label='Confirm Password'
                        moreInfo='Must be at least 8 characters.'
                        isError={
                            formik.touched.confirmPassword &&
                            Boolean(formik.errors.confirmPassword)
                        }
                        errorMessage={formik.errors.confirmPassword}
                    />
                    <Button
                        type='submit'
                        isloading={isLoading}
                        className='mt-4'
                        title='Reset Password'
                    />
                </form>
            </div>
        </div>
    );
};

export default Page;
