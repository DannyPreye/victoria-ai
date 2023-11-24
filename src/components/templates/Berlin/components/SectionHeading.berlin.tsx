import React from "react";

interface Props {
    title: string;
}
const SectionHeading = ({ title }: Props) => {
    return <h2 className='py-4 font-bold text-[1.3rem]'>{title}</h2>;
};

export default SectionHeading;
