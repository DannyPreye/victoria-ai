import { TemplateDocumentType } from "@/types/document";
import React from "react";
import AmsterdamResume from "./Resume";
import AmsterdamCoverLetter from "./Coverletter";

interface Props {
    document: TemplateDocumentType;
}

const AmsterdamTemplate = ({ document }: Props) => {
    return (
        <div className='grid gap-8'>
            <AmsterdamCoverLetter document={document} />
            <AmsterdamResume document={document} />
        </div>
    );
};

export default AmsterdamTemplate;
