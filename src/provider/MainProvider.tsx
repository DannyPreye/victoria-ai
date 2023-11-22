"use client";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

interface Props {
    children: ReactNode;
}

export default function MainProvider({ children }: Props) {
    return (
        <SessionProvider>
            <CacheProvider>
                <ChakraProvider>{children}</ChakraProvider>
            </CacheProvider>
        </SessionProvider>
    );
}
