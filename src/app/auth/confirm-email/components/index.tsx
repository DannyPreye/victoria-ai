"use client";
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

import PageButton from "../../../../components/Button.components";
import InputField from "@/components/Form/InputField.components";
import { useToast } from "@chakra-ui/react";

const ConfirmEmailPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const email = useSearchParams().get("email");
    const toast = useToast();

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
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                const { data } = await axios.post(
                    `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/verify-code`,
                    {
                        email,
                        code: parseInt(values.code),
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (data) {
                    router.push(
                        `/auth/reset-password?email=${email}&code=${values.code}`
                    );
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    toast({
                        title: "Error",
                        status: "error",
                        description: error.response?.data.error.message,
                        duration: 9000,
                        isClosable: true,
                    });
                } else {
                    toast({
                        title: "Error",
                        status: "error",
                        description: "Something went wrong. Please try again",
                        duration: 9000,
                        isClosable: true,
                    });
                }
                setIsLoading(false);
            }
        },
        validationSchema,
    });

    return (
        <div className='h-screen grid place-items-center p-[16px]'>
            <div className='border-2 px-4 py-6 rounded-md shadow-md w-full max-w-[450px] '>
                <div className='flex flex-col items-center gap-3 '>
                    <Image
                        src={"/InstaLetter-logo.png"}
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
                        <InputField
                            value={formik.values.code}
                            label='Code'
                            type='number'
                            name='code'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={
                                formik.touched.code &&
                                Boolean(formik.errors.code)
                            }
                            errorMessage={formik.errors.code}
                        />
                        <div className='flex justify-end'>
                            <PageButton
                                isLoading={isLoading}
                                text='Confirm'
                                type='submit'
                                className='mt-3 text-gray-200 hover:bg-base-secondary-text bg-base-secondary-text'
                                variant='solid'
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ConfirmEmailPage;
