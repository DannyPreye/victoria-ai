"use client";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store";
import { ToastContainer } from "react-toastify";

interface Props {
    children: ReactNode;
}

const Provider = ({ children }: Props) => {
    return (
        <SessionProvider>
            <ReduxProvider store={store}>{children}</ReduxProvider>
            <ToastContainer />
        </SessionProvider>
    );
};

export default Provider;
