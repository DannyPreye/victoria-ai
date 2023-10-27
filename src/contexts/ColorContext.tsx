"use client";
import { TemplateSection } from "@/lib/types";
import React, { ReactNode, useState } from "react";
import { createContext } from "react";

export const documentContext = createContext({
    currentColor: "",
    handleChangeColor: (color: string) => {},
    resumeSections: [] as TemplateSection[],
    handleAddMoreSections: (section: TemplateSection[]) => {},
    handleAllResumeSections: (sections: TemplateSection[]) => {},
});

interface Props {
    children: ReactNode;
}

const ColorContextProvider = ({ children }: Props) => {
    const [currentColor, setCurrentColor] = useState("#0D646B");
    const [resumeSections, setResumeSections] = useState<TemplateSection[]>([]);

    const handleChangeColor = (color: string) => {
        setCurrentColor(color);
    };
    const handleAddMoreSections = (sections: TemplateSection[]) => {
        setResumeSections((prev) => [...prev, ...sections]);
    };
    const handleAllResumeSections = (sections: TemplateSection[]) =>
        setResumeSections(sections);

    return (
        <documentContext.Provider
            value={{
                currentColor,
                handleChangeColor,
                resumeSections,
                handleAddMoreSections,
                handleAllResumeSections,
            }}
        >
            {children}
        </documentContext.Provider>
    );
};

export default ColorContextProvider;
