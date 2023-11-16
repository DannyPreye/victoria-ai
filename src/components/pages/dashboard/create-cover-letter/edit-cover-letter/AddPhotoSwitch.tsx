"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

export const AddPhotoSwitch = ({
    checkProfilePics,
    setCheckProfilePics,
    templateId,
}: {
    templateId: string;
    checkProfilePics: boolean;
    setCheckProfilePics: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const { data: session } = useSession();

    useEffect(() => {
        updateAddProfile();
    }, [checkProfilePics]);

    const updateAddProfile = async () => {
        try {
            const update = await axios.put(
                `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}/user-documents/${templateId}`,
                {
                    data: {
                        addProfilePicture: checkProfilePics,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${session?.jwt}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log(update.data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className='flex items-center gap-3 mt-5'>
            <span>Add Profile Picture</span>
            <div
                onClick={() => setCheckProfilePics((prev) => !prev)}
                className=' w-[80px] h-[25px] px-2 cursor-pointer rounded-[20px] overflow-hidden bg-gray-300 relative flex items-center justify-between'
            >
                <span
                    className={`absolute duration-500 ${
                        !checkProfilePics
                            ? "left-0  bg-gray-700"
                            : "left-[52%] bg-black"
                    } w-[45%] rounded-full h-full`}
                ></span>
                <span
                    className={`relative duration-500 ${
                        !checkProfilePics ? "text-gray-200" : "text-black"
                    }`}
                >
                    No
                </span>
                <span
                    className={`relative ${
                        checkProfilePics ? "text-gray-200" : "text-black"
                    }`}
                >
                    Yes
                </span>
            </div>
        </div>
    );
};
