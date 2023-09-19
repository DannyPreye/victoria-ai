import LandingPageLayout from "@/components/layouts/landing";
import HomePage from "@/components/pages/landing";
import Image from "next/image";

export default function Home() {
    return (
        <main className='container px-[80px] mt-[84px]'>
            <HomePage />
        </main>
    );
}
