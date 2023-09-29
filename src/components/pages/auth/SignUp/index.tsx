"use client";
import Link from "next/link";
import React from "react";
import Button from "../Shared/Button";
import Image from "next/image";
import InputElement from "../Shared/InputElement";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import Cookie from "js-cookie";

const SignUpPage = () => {
    const router = useRouter();
    const jwt = Cookie.get("jwt-token");

    if (jwt) {
        router.push("/dashboard");
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            first_name: "",
            last_name: "",
            password: "",
            confirm_password: "",
        },
        onSubmit: async (values) => {
            let res = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/auth/local/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: values.email,
                        password: values.password,
                        first_name: values.first_name,
                        last_name: values.last_name,
                        username: `${values.first_name}`,
                    }),
                }
            );

            const data: any = await res.json();
            if (data?.user) {
                console.log(data);
                Cookie.set("jwt-token", data.jwt);
            }
        },
    });

    return (
        <div className='flex flex-col items-center '>
            <form
                onSubmit={formik.handleSubmit}
                className='flex flex-col max-w-[500px] w-full mx-auto lg:mt-auto'
            >
                <div className='text-center'>
                    <h1
                        className='leading-[120%] lg:leading-[140%] text-[24px] lg:text-[36px] text-base-secondary-text
             font-[600]'
                    >
                        Welcome to QuickApplyAi
                    </h1>
                    <p className='text-[16px] lg:text-[18px] mt-[12px] font-[500] leading-[24px] lg:leading-[20px] text-gray-iron-600'>
                        Start your 30-day free trial.
                    </p>
                </div>

                <div className='grid grid-cols-2 gap-[20px] mt-[32px] '>
                    <InputElement
                        id='first_name'
                        value={formik.values.first_name}
                        required
                        label='First Name'
                        onChange={formik.handleChange}
                    />
                    <InputElement
                        value={formik.values.last_name}
                        onChange={formik.handleChange}
                        id='last_name'
                        required
                        label='Last Name'
                    />

                    <InputElement
                        value={formik.values.email}
                        type='email'
                        className='w-full col-span-2'
                        label='Email'
                        id='email'
                        onChange={formik.handleChange}
                    />
                    <InputElement
                        value={formik.values.password}
                        required
                        id='password'
                        onChange={formik.handleChange}
                        type='password'
                        className='w-full lg:col-span-1 col-span-2'
                        label='Password'
                        moreInfo='Must be at least 8 characters.'
                    />
                    <InputElement
                        value={formik.values.confirm_password}
                        required
                        type='password'
                        onChange={formik.handleChange}
                        id='confirm_password'
                        className='w-full lg:col-span-1 col-span-2 '
                        label='Confirm Password'
                        moreInfo='Must be at least 8 characters.'
                    />
                </div>
                <Button
                    // onClick={() => router.push("/dashboard")}
                    type='submit'
                    title='Get Started'
                    className='mt-[24px] lg:block hidden'
                />
                {/* This should only show on mobile screen */}
                <Button
                    // onClick={() => router.push("/auth/onboarding")}
                    type='submit'
                    title='Get Started'
                    className='mt-[24px] block lg:hidden'
                />
                <Button
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
                        className='text-primary-yellow'
                        href={"/auth/sign-in"}
                    >
                        Log in
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default SignUpPage;
