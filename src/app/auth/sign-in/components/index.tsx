"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSession, signIn } from "next-auth/react";

import { useToast } from "@chakra-ui/react";
import InputField from "@/components/Form/InputField.components";
import PageButton from "@/components/Button.components";

const SignInPage = () => {
    const router = useRouter();
    const { status } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const validationSchema = yup.object({
        email: yup
            .string()
            .email("Enter a valid email")
            .required("Email is required"),
        password: yup
            .string()
            .min(8, "Password must be atleast 8 character")
            .required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                const res = await signIn("credentials", {
                    ...values,
                    redirect: false,
                }).then((res) => {
                    if (!res?.error) {
                        window.location.replace("/dashboard");
                    } else {
                        toast({
                            title: "Error",
                            description: "Error: invalid email or password",
                            duration: 9000,
                            isClosable: true,
                            status: "error",
                        });
                    }
                });
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        },
        validationSchema,
    });

    return (
        <div className='flex flex-col items-center '>
            <form
                onSubmit={formik.handleSubmit}
                className='flex flex-col lg:max-w-[500px] w-full mx-auto lg:mt-auto'
            >
                <div className='text-center'>
                    <h1
                        className='leading-[120%] mt-[12px] lg:leading-[140%] text-[24px] lg:text-[36px] text-base-secondary-text
             font-[600]'
                    >
                        Hey, Welcome Back!
                    </h1>
                    <p className='text-[16px] lg:text-[18px] mt-[12px] font-[500] leading-[24px] lg:leading-[20px] text-gray-iron-600'>
                        Let&apos;s get back to where we left
                    </p>
                </div>
                <div className='grid gap-[20px] mt-[32px] '>
                    <InputField
                        value={formik.values.email}
                        required
                        className='w-full col-span-2'
                        label='Email'
                        placeholder='Enter your email'
                        type='email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name='email'
                        isError={
                            formik.touched.email && Boolean(formik.errors.email)
                        }
                        errorMessage={formik.errors.email}
                    />
                    <InputField
                        value={formik.values.password}
                        required
                        name='password'
                        type='password'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder='Enter your password'
                        formLabelClassName='w-full col-span-2'
                        label='Password'
                        helperText='Must be at least 8 characters.'
                        isError={
                            formik.touched.password &&
                            Boolean(formik.errors.password)
                        }
                        errorMessage={formik.errors.password}
                    />
                </div>
                <div className='flex  mt-[24px]  items-center justify-between text-[14px] font-[500]  leading-[20px] font-inter'>
                    <div className='flex gap-[8px]  text-gray-700 items-center'>
                        <input type='checkbox' />
                        <p className=''>Remember me</p>
                    </div>
                    <Link
                        className='text-base-primary-green font-inter text-[14px] leading-[20px] font-[600]'
                        href={"/auth/forgot-password"}
                    >
                        Forgot Password
                    </Link>
                </div>
                <PageButton
                    isLoading={isLoading}
                    variant='solid'
                    text='Login'
                    type='submit'
                    className='mt-[24px] hidden h-[53px] lg:block bg-primary-yellow'
                />
                <PageButton
                    variant='solid'
                    isLoading={isLoading}
                    type='submit'
                    text='Login'
                    className='mt-[24px] h-[53px] lg:hidden block bg-primary-yellow'
                />
                <PageButton
                    type='button'
                    onClick={() => {
                        signIn("google", {
                            callbackUrl: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/dashboard`,
                        });
                    }}
                    variant='outline'
                    text='Sign in with Google'
                    Icon={
                        <Image
                            alt='google'
                            width={24}
                            height={24}
                            src={"/assets/icons/google-icon.png"}
                        />
                    }
                    className='mt-[16px] h-[53px] border-1'
                />
                <p className='text-center mt-[32px] text-gray-600 font-inter text-[14px] leading-[20px] font-[400]'>
                    Don&apos;t have an account?{" "}
                    <Link
                        className='text-base-primary-green font-inter text-[14px] leading-[20px] font-[600]'
                        href={"/auth/sign-up"}
                    >
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default SignInPage;
