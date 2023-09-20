"use client";
import Link from "next/link";
import React from "react";
import Button from "../Shared/Button";
import Image from "next/image";
import InputElement from "../Shared/InputElement";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
    const router = useRouter();
    return (
        <div className='flex flex-col items-center '>
            <div className='flex flex-col max-w-[500px] w-full mx-auto lg:mt-auto'>
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
                    <InputElement value='' required label='First Name' />
                    <InputElement value='' required label='Last Name' />

                    <InputElement
                        value=''
                        type='email'
                        className='w-full col-span-2'
                        label='Email'
                    />
                    <InputElement
                        value=''
                        required
                        type='password'
                        className='w-full lg:col-span-1 col-span-2'
                        label='Password'
                        moreInfo='Must be at least 8 characters.'
                    />
                    <InputElement
                        value=''
                        required
                        type='password'
                        className='w-full lg:col-span-1 col-span-2 '
                        label='Confirm Password'
                        moreInfo='Must be at least 8 characters.'
                    />
                </div>
                <Button
                    onClick={() => router.push("/dashboard")}
                    title='Get Started'
                    className='mt-[24px]'
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
            </div>
        </div>
    );
};

export default SignUpPage;
