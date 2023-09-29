"use client";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store";

interface Props {
    children: ReactNode;
}

const Provider = ({ children }: Props) => {
    return (
        <SessionProvider>
            <ReduxProvider store={store}>{children}</ReduxProvider>
        </SessionProvider>
    );
};

export default Provider;
