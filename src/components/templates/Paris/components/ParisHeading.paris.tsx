import React from "react";

interface HeadingProps
{
    username: string;
    professionalTitle: string;
}
export const ParisHeading = ({ username, professionalTitle }: HeadingProps) =>
{
    return (
        <>
            <div className='h-[300px] absolute flex justify-end -left-5 px-8 py-10 -top-11 rotate-[4deg] bg-black w-[120%]'></div>
            <div className='absolute flex justify-end text-white right-0  w-full px-8 top-[6%] flex-col items-end '>
                <h1
                    style={ { color: "white" } }
                    className={ `font-bold text-5xl uppercase   flex gap-2 ` }
                >
                    { username }
                </h1>
                <p className='tracking-2'>{ professionalTitle }</p>
            </div>
        </>
    );
};
