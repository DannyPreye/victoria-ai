import { DisplayTemplate } from "@/lib/types";
import React from "react";

const LondonResume = ({ attributes }: DisplayTemplate) => {
    return (
        <div className='flex'>
            <div
                style={ {
                borderColor: attributes?.color
            }}
                className={`border-r-[3px]  w-[40%] py-12`}
            >
                {" "}
            </div>
            <div className='w-[60%]  py-12 px-4'></div>
        </div>
    );
};

export default LondonResume;
