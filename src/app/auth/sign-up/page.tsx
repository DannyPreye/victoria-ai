import AuthLayout from "@/components/layouts/auth";
import SignUpPage from "@/components/pages/auth/SignUp";
import { authSlides } from "@/lib/dummyData";
import React from "react";

const page = () => {
    return (
        <AuthLayout slides={authSlides}>
            <SignUpPage />
        </AuthLayout>
    );
};

export default page;
