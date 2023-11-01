"use client";
import React from "react";

interface EditTabProps {
    setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
    index: number;
    text: string;
    currentTab: number;
}
export const EditorTab = ({
    index,
    text,
    setCurrentTab,
    currentTab,
}: EditTabProps) => {
    return (
        <button
            onClick={() => setCurrentTab(index)}
            key={text}
            className={`py-[10px] rounded-t-[10px] w-fit px-[35px] lg:w-[256px] font-inter text-[14px] font-[600] leading-[20px] ${
                currentTab === index
                    ? "bg-base-primary-green text-white"
                    : "border-[1px] border-base-primary-green bg-white text-black "
            }`}
        >
            {text}
        </button>
    );
};
