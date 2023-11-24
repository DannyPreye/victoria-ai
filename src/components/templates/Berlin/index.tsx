import { TemplateDocumentType } from "@/types/document";
import React from "react";
import BerlinCoverletter from "./Coverletter";

interface Props {
    document: TemplateDocumentType;
}

const BerlinTemplate = ({ document }: Props) => {
    return (
        <div className='grid gap-8'>
            <BerlinCoverletter document={document} />
            {/* <BerlinResume document={document} /> */}
        </div>
    );
};

export default BerlinTemplate;
