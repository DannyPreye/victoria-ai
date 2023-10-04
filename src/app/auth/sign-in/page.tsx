import AuthLayout from "@/components/layouts/auth";
import SignInPage from "@/components/pages/auth/SignIn";
import { authSlides } from "@/lib/dummyData";

import React from "react";



const page = () =>
{
    return (
        <AuthLayout slides={authSlides}>
            <SignInPage />
        </AuthLayout>
    );
};

export default page;
