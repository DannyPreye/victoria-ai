import React from "react";
import LondonCoverLetter from "./CoverLetterTemplate";
import LondonResume from "./ResumeTemplate";
import { TemplateDocumentType } from "@/types/document";

interface Props {
    document: TemplateDocumentType;
}

const LondonTemplate = ({ document }: Props) => {
    return (
        <div className='grid gap-8'>
            <LondonCoverLetter document={document} />
            <LondonResume document={document} />
        </div>
    );
};

export default LondonTemplate;
