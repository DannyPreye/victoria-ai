import React from "react";

// import ParisTemplate from "@/components/templatesView/Paris";
import { TemplateDocumentType } from "@/types/document";
import LondonTemplate from "@/components/templates/London";
import ParisTemplate from "@/components/templates/Paris";

interface Props {
    document: TemplateDocumentType;
}
const PreviewDocumentPage = ({ document }: Props) => {
    return (
        <div className='grid gap-[16px] lg:px-[24px] p-[16px] w-full  '>
            {/* <LondonTemplate document={document} /> */}
            <ParisTemplate document={document} />
        </div>
    );
};

export default PreviewDocumentPage;
