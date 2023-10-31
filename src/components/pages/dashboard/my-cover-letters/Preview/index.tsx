import React from "react";
import Resume from "./Resume";
import CoverLetter from "./CoverLetter";

interface Props {
    document: any;
}
const PreviewDocumentPage = ({ document }: Props) => {
    console.log(document?.template);

    return (
        <div className='grid gap-[16px] lg:px-[24px] p-[16px] w-full  '>
            <CoverLetter coverLetterSections={document?.template?.coverLetter?.sections} />
            <Resume  resumeSections={document?.template?.resume?.sections}/>
        </div>
    );
};

export default PreviewDocumentPage;
