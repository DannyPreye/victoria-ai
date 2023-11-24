"use client";
import { TemplateSection } from "@/types/template";
import { useToast } from "@chakra-ui/react";
import React, { ReactNode, useState } from "react";
import { createContext } from "react";
import { object } from "yup";
export const documentContext = createContext({
    currentColor: "",
    handleChangeColor: (color: string) => {},
    resumeSections: {} as any,
    handleAddMoreSections: (section: any) => {},
    handleAllResumeSections: (sections: any) => {},
});

interface Props {
    children: ReactNode;
}

const TemplateContextProvider = ({ children }: Props) => {
    const [currentColor, setCurrentColor] = useState("#000000");
    const [resumeSections, setResumeSections] = useState<any>();
    const toast = useToast();

    const handleChangeColor = (color: string) => {
        setCurrentColor(color);
    };
    const handleAddMoreSections = (sections: any[]) => {
        if (sections.length > 4) {
            toast({
                title: "Error",
                description: "You cannot add more than 4 additional sections",
                status: "error",
                isClosable: true,
                duration: 3000,
            });
            sections = [];
            return;
        }
        for (const section of sections) {
            if (
                typeof resumeSections.otherSection === "object" &&
                Object.keys(resumeSections?.otherSections).includes(
                    Object.keys(section)[0]
                )
            ) {
                toast({
                    title: "Error",
                    description: `Duplicate section '${
                        Object.keys(sections)[0]
                    }' is not allowed.`,
                    status: "error",
                    isClosable: true,
                    duration: 3000,
                });
                sections = [];
                break;
            }

            if (
                typeof resumeSections.otherSection === "object" &&
                Object.keys(resumeSections?.otherSection).length > 4
            ) {
                toast({
                    title: "Error",
                    description: `You cannot add more than 4 additional sections`,
                    status: "error",
                    isClosable: true,
                    duration: 3000,
                });
                sections = [];
                break; // Exit the loop if the limit is reached
            }
            // setResumeSections((prev: any) => ({
            //     ...prev,
            //     otherSections: [...prev.otherSections, section],
            // }));

            resumeSections.otherSections = {
                ...resumeSections.othersections,
                ...section,
            };
        }
    };

    const handleAllResumeSections = (sections: any) => {
        setResumeSections({ ...sections, ...sections.otherSections });
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

export default TemplateContextProvider;
