"use client";
import React from "react";

export const AddPhotoSwitch = ({
    checkProfilePics,
    setCheckProfilePics,
}: {
    checkProfilePics: boolean;
    setCheckProfilePics: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    console.log(checkProfilePics);
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
