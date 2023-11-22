"use client";
import DashboardHeading from "@/components/DashboardHeading.components";
import { gqlQery } from "@/config/grapql/graphql.config";

import { getUserDocuments } from "@/utils/gql/document.gql";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { EachDocument } from "./EachDocument";
import { Spinner } from "@chakra-ui/react";

interface Props {
    templates: any[];
}

const MyDocumentPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [templates, setTemplates] = useState<any[]>([]);
    const { data: session } = useSession();

    const getUserDocs = async () => {
        if (session?.jwt) {
            try {
                const data = await gqlQery(
                    getUserDocuments(session?.user.id as string, 1),
                    session?.jwt
                );
                console.log(data);
                setTemplates(data?.userDocuments.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        }
    };

    console.log(templates);

    useEffect(() => {
        getUserDocs();
    }, [session?.jwt]);

    return (
        <div>
            <DashboardHeading title='My Cover Letters' />
            {isLoading ? (
                <div className=' grid place-items-center py-5'>
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='#E1AE25'
                        size='xl'
                    />
                </div>
            ) : templates?.length > 0 ? (
                <section className='mt-[44px] px-[16px] lg:px-[24px]  grid grid-cols-1 lg:grid-cols-3 gap-[24px]'>
                    {templates.map((data, id) => (
                        <EachDocument
                            template={data?.attributes?.template}
                            docName={data?.title}
                            docId={data?.id}
                            key={data?.id}
                        />
                    ))}
                </section>
            ) : (
                <div className=' grid place-items-center py-5'>
                    <p>You don&apos;t have any document yet</p>
                </div>
            )}
        </div>
    );
};

export default MyDocumentPage;
