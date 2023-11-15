import React from "react";
import Resume from "./Resume";
import CoverLetter from "./CoverLetter";
import LondonCoverLetter from "@/components/templatesView/London/CoverLetter";
import { TemplateDocumentType } from "@/lib/types/document";
import LondonTemplate from "@/components/templatesView/London";

interface Props {
    document: TemplateDocumentType;
}
const PreviewDocumentPage = ({ document }: Props) => {
    console.log(document);

    return (
        <div className='grid gap-[16px] lg:px-[24px] p-[16px] w-full  '>
            <LondonTemplate document={document} />
        </div>
    );
};

export default PreviewDocumentPage;
