"use client";
import React, { useState } from "react";
import Modal from "@/components/shared/Modal";
import Button from "@/components/pages/auth/Shared/Button";
import { signOut, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { deleteUserAccount } from "@/lib/helpers";
import { useRouter } from "next/navigation";

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
            toast.error("Something went wrong. Please try again");
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
                    <p>Are you sure you want to delete your account ? </p>
                    <div className='flex justify-between gap-8 items-center '>
                        <Button
                            title='Cancel'
                            onClick={() => setOpenDeleteModal(false)}
                            className='px-2'
                        />

                        <Button
                            isloading={isLoading}
                            onClick={handleDeleteAccount}
                            className='px-2'
                            title='Delete'
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
};
