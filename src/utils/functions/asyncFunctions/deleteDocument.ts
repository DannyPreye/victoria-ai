import { ToastId, UseToastOptions } from "@chakra-ui/react";
import axios from "axios";
import { Session } from "next-auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface Props
{
    session: Session | null;
    router: AppRouterInstance;
    id: string;

}
export const deleteDocument = async ({ session, id, router, }: Props) =>
{

    if (session?.jwt) {
        const { data } = await axios.delete(
            `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/user-documents/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${session.jwt}`,
                },
            }
        );

        if (data?.status) {
            router.push(`/dashboard/my-documents`);
        }
    }

};
