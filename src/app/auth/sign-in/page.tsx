import AuthLayout from "@/components/layouts/auth";
import SignInPage from "@/components/pages/auth/SignIn";
import { authSlides } from "@/lib/dummyData";
import { redirect } from "next/navigation";
import React from "react";
// import {authOptions} from "../../api/auth/[...nextauth]"

const page = () => {
    return (
        <AuthLayout slides={authSlides}>
            <SignInPage />
        </AuthLayout>
    );
};

export default page;
