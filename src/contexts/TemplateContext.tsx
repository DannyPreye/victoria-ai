"use client";
import { TemplateSection } from "@/types/template";
import { useToast } from "@chakra-ui/react";
import React, { ReactNode, useState } from "react";
import { createContext } from "react";
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
                resumeSections.otherSections.some(
                    (item: any) => item.title === section.title
                )
            ) {
                // toast.error(
                //     `Duplicate section '${section.title}' is not allowed.`
                // );
                toast({
                    title: "Error",
                    description: `Duplicate section '${section.title}' is not allowed.`,
                    status: "error",
                    isClosable: true,
                    duration: 3000,
                });
                sections = [];
                break;
            }
            if (resumeSections.otherSections.length > 4) {
                toast({
                    title: "Error",
                    description: `You cannot add more than 4 additional sections`,
                    status: "error",
                    isClosable: true,
                    duration: 3000,
                });
                sections = [];
                break; // Exit the loop if the limit is reached
            } else {
                setResumeSections((prev: any) => ({
                    ...prev,
                    otherSections: [...prev.otherSections, section],
                }));
            }
        }
    };
    const handleAllResumeSections = (sections: any) => {
        console.log(sections);

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
