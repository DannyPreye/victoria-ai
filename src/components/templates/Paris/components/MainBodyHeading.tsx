import React from "react";

const MainBodyHeading = ({ title }: { title: string }) => {
    return (
        <h2 className='text-gray-500 font-oswald  border-black uppercase mx-auto mt-5  text-center border-b-[1px] text-2xl font-semibold'>
            {title}
        </h2>
    );
};

export default MainBodyHeading;
