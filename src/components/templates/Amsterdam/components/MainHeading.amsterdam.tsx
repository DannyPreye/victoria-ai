import React from "react";

interface Props {
    firstName: string;
    lastName: string;
    professionalTitle: string;
    color: string;
}
const MainHeading = ({
    firstName,
    lastName,
    professionalTitle,
    color,
}: Props) => {
    return (
        <div className='grid gap-3'>
            <h1 className=' font-exo tracking-wider leading-[120%] uppercase text-7xl'>
                {firstName} <br />
                {lastName}
            </h1>
            <p className='bg-[#f2f0f0] text-black p-2 font- font-thin tracking-widest'>
                {professionalTitle}
            </p>
        </div>
    );
};

export default MainHeading;
