"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import InputElement from "../Shared/InputElement";
import Button from "../Shared/Button";
import Image from "next/image";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ForgetPassword = () => {
    const [isLoading, setIsloading] = useState(false);
    const router = useRouter();
    const validationSchema = yup.object({
        email: yup
            .string()
            .email("Enter a valid email")
            .required("Email field is require"),
    });
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit: async (values) => {
            setIsloading(true);
            try {
                const { data } = await axios.post(
                    `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/send-code`,
                    { email: values.email },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                setIsloading(false);
                if (data?.status) {
                    router.push(
                        `/auth/confirm-email?email=${formik.values.email}`
                    );
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    toast.error(error.response?.data.error.message);
                } else {
                    toast.error("Something went wrong. Please try again");
                }
                setIsloading(false);
            }
        },
    });

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
                    <h1 className='text-center font-inter text-lg lg:text-2xl text-base-secondary-text font-bold '>
                        Forgot password
                    </h1>
                </div>
                <form onSubmit={formik.handleSubmit} className='mt-4'>
                    <InputElement
                        label='Email'
                        placeholder='Enter your email'
                        value={formik.values.email}
                        id='email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <Button
                        isloading={isLoading}
                        title='Submit'
                        className='mt-3'
                    />
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;
