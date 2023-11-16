import { TemplateDocumentType } from "@/lib/types/document";
import React from "react";
import ParisCoverLetter from "./CoverLetter.paris";
import ParisResume from "./Resume.paris";

interface Props {
    document: TemplateDocumentType;
}

const ParisTemplate = ({ document }: Props) => {
    return (
        <div className='grid gap-8'>
            <ParisCoverLetter document={document} />
            <ParisResume document={document} />
        </div>
    );
};

export default ParisTemplate;
