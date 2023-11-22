import React from "react";

import AuthLayout from "@/layouts/AuthLayout";
import SignInPage from "./components";
import { authSlides } from "@/constants/auth_slides.constants";

const page = () => {
    return (
        <AuthLayout slides={authSlides}>
            <SignInPage />
        </AuthLayout>
    );
};

export default page;
