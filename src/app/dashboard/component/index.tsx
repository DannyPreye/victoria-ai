"use client";
import DashboardHeading from "@/components/DashboardHeading.components";
import { Template } from "@/types/template";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { EachTemplate } from "./EachTemplate";
import { getDocTemplates } from "@/utils/functions/asyncFunctions/getDocTemplates";

const DasboardHomePage = () => {
    const [templates, setTemplates] = useState<Template>();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setError] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        getDocTemplates({
            session,
            setError,
            setIsLoading,
            setTemplates,
        });
    }, [session?.jwt]);

    return (
        <div>
            <DashboardHeading title={"Select Cover Letter Template"} />
            {isLoading ? (
                <div className=' grid place-items-center py-5'>
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                </div>
            ) : (
                <section className='mt-[44px] px-[16px] lg:px-[24px] grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]'>
                    {templates?.data?.map((template, id) => (
                        <EachTemplate template={template} key={id} />
                    ))}
                </section>
            )}
        </div>
    );
};

export default DasboardHomePage;
