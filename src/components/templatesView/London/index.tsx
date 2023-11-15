import { TemplateDocumentType } from "@/lib/types/document";
import React from "react";
import LondonCoverLetter from "./CoverLetter";
import LondonResume from "./Resume";

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
