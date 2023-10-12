"use client";
import Image from "next/image";
import React from "react";
import { AiOutlineCheckSquare } from "react-icons/ai";
import Button from "../Shared/Button";
import { useRouter, useSearchParams } from "next/navigation";
import InputElement from "../Shared/InputElement";
import { useFormik } from "formik";
import * as yup from "yup";

const ResetPassword = () => {
    const router = useRouter();
    const email = useSearchParams().get("email");

    const validationSchema = yup.object({
        code: yup
            .string()
            .test(
                "is-number",
                "Must be a number",
                (value) => !isNaN(Number(value))
            )
            .max(4)
            .required("Code is required"),
    });

    const formik = useFormik({
        initialValues: {
            code: "",
        },
        onSubmit: (values) => {
            router.push(
                `/auth/reset-password?email=${email}&code=${values.code}`
            );
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
                    <h1 className='text-center flex items-center gap-3 font-inter text-lg lg:text-2xl text-base-secondary-text font-bold '>
                        <span>Confirm Email Sent</span> <AiOutlineCheckSquare />
                    </h1>
                    <p className='text-center '>
                        Enter 4 digit verification code sent to you {email}
                    </p>
                    <form
                        onSubmit={formik.handleSubmit}
                        className='my-5 flex flex-col gap-3 w-full'
                    >
                        <InputElement
                            value={formik.values.code}
                            label='Code'
                            type='number'
                            id='code'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={
                                formik.touched.code &&
                                Boolean(formik.errors.code)
                            }
                            errorMessage={formik.errors.code}
                        />
                        <Button className='mt-4' title='Login' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
