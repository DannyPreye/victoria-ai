import Modal from "@/components/shared/Modal";
import React from "react";

interface Props {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isModalOpen: boolean;
}
const AddMoreSectionsModal = ({ setIsModalOpen, isModalOpen }: Props) => {
    return (
        <Modal>
            <div
                onClick={() => setIsModalOpen(false)}
                className={`fixed top-0 left-0 lg:px-[58px] flex-col flex items-center justify-center
                h-screen w-screen backdrop-blur-sm bg-[rgba(141,172,216,0.25)] ${
                    isModalOpen ? "block" : "hidden"
                }`}
            >
                <div className='w-[90%] pt-[60px] pb-[45px] max-w-[964px] flex flex-col items-center h-[321px] bg-white rounded-[20px]'>
                    <p className='text-[15px] leading-[40px] font-[600] text-center'>
                        Additional Sections
                    </p>
                </div>
            </div>
        </Modal>
    );
};

export default AddMoreSectionsModal;
