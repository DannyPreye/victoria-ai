"use client";
import { TemplateSection } from "@/lib/types";
import React, { ReactNode, useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
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
    const [defaultResumeSections, setDefaultResumeSections] = useState<
        TemplateSection[]
    >([]);

    const handleChangeColor = (color: string) => {
        setCurrentColor(color);
    };
    const handleAddMoreSections = (sections: TemplateSection[]) => {
        // console.log(defaultResumeSections.length, resumeSections.length);
        // console.log(sections)
        // if (sections.length > 4) {
        //     toast.error("You can add a maximum of 4 additional sections.");
        // }
        for (const section of sections) {
            if (
                resumeSections.some(
                    (existingSection: TemplateSection) =>
                        existingSection.sectionTitle === section.sectionTitle
                )
            ) {
                toast.error(
                    `Duplicate section '${section.sectionTitle}' is not allowed.`
                );
            } else if (
                defaultResumeSections.length + 4 == resumeSections.length ||
                sections.length > 4
            ) {
                toast.error("You can add a maximum of 4 additional sections.");
                break; // Exit the loop if the limit is reached
            } else {
                setResumeSections((prev) => [...prev, section]);
            }
        }
    };
    const handleAllResumeSections = (sections: TemplateSection[]) => {
        setResumeSections([...sections]);
        setDefaultResumeSections([...sections]);
    };

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
