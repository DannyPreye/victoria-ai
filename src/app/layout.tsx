import "./globals.css";
import type { Metadata } from "next";
import MainProvider from "@/provider/MainProvider";
import LandingPageLayout from "@/layouts/LandingPageLayout";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
    title: "Instaletter",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body className='font-poppins'>
                <NextTopLoader showSpinner={false} color='#07397D' />
                <MainProvider>
                    <LandingPageLayout>
                        {children}
                        <div id='portal'></div>
                    </LandingPageLayout>
                </MainProvider>
            </body>
        </html>
    );
}
