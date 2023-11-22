import React from "react";

import { TemplateDocumentType } from "@/types/document";
import ParisCoverLetter from "./CoverLetter";
import ParisResume from "./Resume";

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
