import LandingPageLayout from "@/components/layouts/landing";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "@/components/Provider";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
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
                <Provider>
                    <LandingPageLayout>
                        {children}
                        <div id='portal'></div>
                    </LandingPageLayout>
                </Provider>
            </body>
        </html>
    );
}
