"use client";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const CreateCoverLetterPage = () => {
    const [file, setFile] = useState<File>();
    const fileFormats = ["JPG", "PNG", "SVG", "GIF"];
    return (
        <div className='mt-[12px] p-[32px] flex flex-col items-center'>
            <FileUploader
                className='max-w-[796PX] h-[182px]
            py-[16px] px-[24px] border-dotted border-[1px]'
            ></FileUploader>
        </div>
    );
};

export default CreateCoverLetterPage;
