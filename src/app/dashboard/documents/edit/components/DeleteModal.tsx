"use client";
import React from "react";
import Modal from "@/components/Modal.components";
import PageButton from "@/components/Button.components";

interface DeleteModalProps {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isModalOpen: boolean;
    handleDelete: () => void;
    projectName: string;
}
export const DeleteModal = ({
    isModalOpen,
    setIsModalOpen,
    handleDelete,
    projectName,
}: DeleteModalProps) => {
    return (
        <Modal>
            <div
                onClick={() => setIsModalOpen(false)}
                className={`fixed top-0 left-0 lg:px-[58px] flex-col flex items-center justify-center
                h-screen w-screen backdrop-blur-sm bg-[rgba(141,172,216,0.25)] ${
                    isModalOpen ? "block" : "hidden"
                }`}
            >
                <div className='bg-white py-3 grid gap-4 px-4 rounded-md h-[240px] max-w-[450px] w-[90%]'>
                    <p className='text-center font-semibold font-inter'>
                        Are you sure you want to delete {projectName}?
                    </p>
                    <div className='flex justify-between gap-4 items-center'>
                        <PageButton
                            text='Cancel'
                            variant='outline'
                            className='h-[52px]'
                            onClick={() => setIsModalOpen(false)}
                        />
                        <PageButton
                            variant='solid'
                            text='Delete'
                            className='bg-red-400 h-[52px]'
                            onClick={handleDelete}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
};
