"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import { signIn, useSession } from "next-auth/react";

import { v4 as uuid } from "uuid";
import { useToast } from "@chakra-ui/react";
import InputField from "@/components/Form/InputField.components";
import PageButton from "@/components/Button.components";

const SignUpPage = () => {
    const router = useRouter();
    const { status } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    if (status == "authenticated") {
        router.push("/dashboard");
    }

    const validationSchema = yup.object({
        first_name: yup.string().required("First name is required"),
        last_name: yup.string().required("Last name is required"),
        email: yup
            .string()
            .email("Enter a valide email")
            .required("Email is required"),
        password: yup
            .string()
            .min(8, "Password must be at least 8 characters."),
        confirm_password: yup
            .string()
            .oneOf([yup.ref("password")], "Passwords must match")
            .required("Confirm password field is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            first_name: "",
            last_name: "",
            password: "",
            confirm_password: "",
        },
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
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
                            username: uuid(),
                        }),
                    }
                );

                const data: any = await res.json();
                setIsLoading(false);
                if (data?.user) {
                    router.push("/auth/sign-in");
                } else if (data?.error) {
                    toast({
                        status: "error",
                        title: "Error",
                        description: "Email is already registered",
                        isClosable: true,
                        duration: 9000,
                    });
                }
            } catch (error) {
                setIsLoading(false);

                toast({
                    status: "error",
                    title: "Error",
                    description: "An error occured please try again",
                    isClosable: true,
                    duration: 9000,
                });
            }
        },
        validationSchema: validationSchema,
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
                    <InputField
                        name='first_name'
                        value={formik.values.first_name}
                        required
                        label='First Name'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isError={
                            formik.touched.first_name &&
                            Boolean(formik.errors.first_name)
                        }
                        errorMessage={formik.errors.first_name}
                    />
                    <InputField
                        value={formik.values.last_name}
                        onChange={formik.handleChange}
                        name='last_name'
                        required
                        label='Last Name'
                        onBlur={formik.handleBlur}
                        isError={
                            formik.touched.last_name &&
                            Boolean(formik.errors.last_name)
                        }
                        errorMessage={formik.errors.last_name}
                    />

                    <InputField
                        value={formik.values.email}
                        type='email'
                        className='w-full col-span-2'
                        onBlur={formik.handleBlur}
                        label='Email'
                        name='email'
                        onChange={formik.handleChange}
                        isError={
                            formik.touched.email && Boolean(formik.errors.email)
                        }
                        errorMessage={formik.errors.email}
                    />
                    <InputField
                        value={formik.values.password}
                        required
                        name='password'
                        onChange={formik.handleChange}
                        type='password'
                        className='w-full lg:col-span-1 col-span-2'
                        label='Password'
                        helperText='Must be at least 8 characters.'
                        onBlur={formik.handleBlur}
                        isError={
                            formik.touched.password &&
                            Boolean(formik.errors.password)
                        }
                        errorMessage={formik.errors.password}
                    />
                    <InputField
                        value={formik.values.confirm_password}
                        required
                        type='password'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name='confirm_password'
                        className='w-full lg:col-span-1 col-span-2 '
                        label='Confirm Password'
                        helperText='Must be at least 8 characters.'
                        isError={
                            formik.touched.confirm_password &&
                            Boolean(formik.errors.confirm_password)
                        }
                        errorMessage={formik.errors.confirm_password}
                    />
                </div>
                <PageButton
                    isLoading={isLoading}
                    type='submit'
                    text='Get Started'
                    variant='solid'
                    className='mt-[24px] lg:block hidden'
                />
                {/* This should only show on mobile screen */}
                <PageButton
                    isLoading={isLoading}
                    variant='solid'
                    type='submit'
                    text='Get Started'
                    className='mt-[24px] block lg:hidden'
                />
                <PageButton
                    text='Sign up with Google'
                    onClick={() => {
                        signIn("google");
                    }}
                    variant='outline'
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
