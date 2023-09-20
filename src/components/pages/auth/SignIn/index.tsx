"use client";
import React from "react";
import InputElement from "../Shared/InputElement";
import Button from "../Shared/Button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignInPage = () => {
    const router = useRouter();
    return (
        <div className='flex flex-col items-center '>
            <div className='flex flex-col lg:max-w-[500px] w-full mx-auto lg:mt-auto'>
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
                        value=''
                        className='w-full col-span-2'
                        label='Phone Number'
                        placeholder='Enter your phone number'
                    />
                    <InputElement
                        value=''
                        required
                        type='password'
                        placeholder='Create a password'
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
                    <Link href={"#"}>Forgot Password</Link>
                </div>
                <Button
                    onClick={() => router.push("/dashboard")}
                    title='Login'
                    className='mt-[24px] bg-primary-yellow'
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
                        className='text-base-primary-green'
                        href={"/auth/sign-up"}
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignInPage;
