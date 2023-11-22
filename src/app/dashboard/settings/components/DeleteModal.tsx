"use client";
import React, { useState } from "react";
import Modal from "@/components/Modal.components";

import { signOut, useSession } from "next-auth/react";

import { deleteUserAccount } from "@/utils/functions/asyncFunctions/deleteUserAccount";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import PageButton from "@/components/Button.components";

interface DeleteModalProps {
    setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
    openDeleteModal: boolean;
}
export const DeleteModal = ({
    setOpenDeleteModal,
    openDeleteModal,
}: DeleteModalProps) => {
    const { data: session } = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const handleDeleteAccount = async () => {
        setIsLoading(true);
        try {
            const res: any = await deleteUserAccount({
                user_id: session?.user.id as string,
                jwt: session?.jwt as string,
            });
            setIsLoading(false);
            if (res) {
                await signOut();
                router.push("/auth/sign-up");
            }
        } catch (error) {
            setIsLoading(false);

            toast({
                title: "Error",
                description: "Something went wrong. Please try again",
                duration: 9000,
                status: "error",
                isClosable: true,
            });
        }
    };
    return (
        <Modal>
            <div
                className={`fixed z-[2000] left-0 top-0 w-screen h-screen bg-[#00000036] backdrop-blur-sm place-items-center  justify-center items-center duration-700 ${
                    openDeleteModal ? "flex" : "hidden"
                } items-start`}
                onClick={() => setOpenDeleteModal(false)}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className='w-[80%] grid place-items-center gap-5 max-w-[450px] h-[200px] bg-white rounded-md p-4'
                >
                    <p className='text-[30px]'>
                        Are you sure you want to delete your account ?{" "}
                    </p>
                    <div className='flex justify-between gap-8 items-center '>
                        <PageButton
                            text='Cancel'
                            variant='outline'
                            onClick={() => setOpenDeleteModal(false)}
                            className='px-2 h-[54px] '
                        />

                        <PageButton
                            isLoading={isLoading}
                            variant='solid'
                            onClick={handleDeleteAccount}
                            className='px-2 h-[54px]'
                            text='Delete'
                            loadingText='Deleting'
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
};
