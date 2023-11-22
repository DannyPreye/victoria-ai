import { authSlides } from "@/constants/auth_slides.constants";
import AuthLayout from "@/layouts/AuthLayout";
import React from "react";
import SignUpPage from "./components";

const page = () => {
    return (
        <AuthLayout slides={authSlides}>
            <SignUpPage />
        </AuthLayout>
    );
};

export default page;
