"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSession, signIn } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";

import InputElement from "../Shared/InputElement";
import Button from "../Shared/Button";

const SignInPage = () => {
    const router = useRouter();
    const { status } = useSession();
    const jwt = Cookies.get("jwt-token");
    const [isLoading, setIsLoading] = useState(false);

    // if (status == "authenticated") router.push("/dashboard");

    const validationSchema = yup.object({
        email: yup
            .string()
            .email("Enter a valid email")
            .required("Email is required"),
        password: yup.string().required("Password is required"),
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
                    // callbackUrl: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/dashboard`,
                    redirect: false,
                }).then((res) => {
                    console.log("This is the resoins", res);
                    if (!res?.error) {
                        // window.location.replace("/dashboard");
                    } else {
                        console.log(res?.error);
                        toast.error(res?.error);
                    }
                });
                console.log("This is the respoons", res);
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
                    <InputElement
                        value={formik.values.email}
                        required
                        className='w-full col-span-2'
                        label='Email'
                        placeholder='Enter your email'
                        type='email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id='email'
                    />
                    <InputElement
                        value={formik.values.password}
                        required
                        id='password'
                        type='password'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder='Enter your password'
                        className='w-full col-span-2'
                        label='Password'
                        moreInfo='Must be at least 8 characters.'
                    />
                </div>
                <div className='flex  mt-[24px]  items-center justify-between text-[14px] font-[500]  leading-[20px] font-inter'>
                    <div className='flex gap-[8px]  text-gray-700 items-center'>
                        <input type='checkbox' />
                        <p className=''>Remember me</p>
                    </div>
                    <Link
                        className='text-base-primary-green font-inter text-[14px] leading-[20px] font-[600]'
                        href={"#"}
                    >
                        Forgot Password
                    </Link>
                </div>
                <Button
                    // onClick={() => router.push("/dashboard")}
                    isloading={isLoading}
                    title='Login'
                    type='submit'
                    className='mt-[24px] hidden lg:block bg-primary-yellow'
                />
                <Button
                    isloading={isLoading}
                    type='submit'
                    // onClick={() => router.push("/auth/onboarding")}
                    title='Login'
                    className='mt-[24px] lg:hidden block bg-primary-yellow'
                />
                <Button
                    type='button'
                    onClick={() => {
                        signIn("google", {
                            callbackUrl: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/dashboard`,
                        });
                        // router.push(
                        //     `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/connect/google/callback`
                        // );
                    }}
                    title='Sign up with Google'
                    Icon={
                        <Image
                            alt='google'
                            width={24}
                            height={24}
                            src={"/assets/icons/google-icon.png"}
                        />
                    }
                    className='mt-[16px]'
                />
                <p className='text-center mt-[32px] text-gray-600 font-inter text-[14px] leading-[20px] font-[400]'>
                    Already have an account?{" "}
                    <Link
                        className='text-base-primary-green font-inter text-[14px] leading-[20px] font-[600]'
                        href={"/auth/sign-up"}
                    >
                        Sign Up
                    </Link>
                </p>
            </form>

            <ToastContainer />
        </div>
    );
};

export default SignInPage;
