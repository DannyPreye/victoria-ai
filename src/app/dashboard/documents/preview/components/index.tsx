import React from "react";

// import ParisTemplate from "@/components/templatesView/Paris";
import { TemplateDocumentType } from "@/types/document";
import LondonTemplate from "@/components/templates/London";
import ParisTemplate from "@/components/templates/Paris";
import { templateType } from "@/constants/templateType.constants";

interface Props {
    document: TemplateDocumentType;
}
const PreviewDocumentPage = ({ document }: Props) => {
    // const Template = templateType.find(
    //     (item) =>
    //         document.templateType.toLowerCase() === item.title.toLowerCase()
    // )?.component;

    const Template = templateType.find(
        (item) => "berlin" === item.title.toLowerCase()
    )?.component;

    return (
        <div className='grid gap-[16px] lg:px-[24px] p-[16px] w-full  '>
            {/* <LondonTemplate document={document} /> */}
            {Template ? <Template document={document} /> : ""}
        </div>
    );
};

export default PreviewDocumentPage;
