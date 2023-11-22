"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import InputField from "@/components/Form/InputField.components";
import PageButton from "@/components/Button.components";
import { useToast } from "@chakra-ui/react";

const ForgetPassword = () => {
    const [isLoading, setIsloading] = useState(false);
    const router = useRouter();
    const toast = useToast();

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
                    toast({
                        title: "Error",
                        status: "error",
                        description: error.response?.data.error.message,
                        isClosable: true,
                        duration: 9000,
                    });
                } else {
                    toast({
                        title: "Error",
                        status: "error",
                        description: "Something went wrong please try again",
                        isClosable: true,
                        duration: 9000,
                    });
                }
                setIsloading(false);
            }
        },
        validationSchema: yup.object({
            email: yup
                .string()
                .email("Enter a valid email address")
                .required("Email is required"),
        }),
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
                    <h1 className='text-center font-inter text-lg lg:text-2xl text-base-secondary-text font-bold '>
                        Forgot password
                    </h1>
                </div>
                <form onSubmit={formik.handleSubmit} className='mt-4'>
                    <InputField
                        label='Email'
                        placeholder='Enter your email'
                        value={formik.values.email}
                        name='email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isError={
                            formik.touched.email && Boolean(formik.errors.email)
                        }
                        errorMessage={formik.errors.email}
                    />
                    <PageButton
                        isLoading={isLoading}
                        text='Submit'
                        className='mt-3 bg-base-secondary-text'
                        variant='solid'
                    />
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;
