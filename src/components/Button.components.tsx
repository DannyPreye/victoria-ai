import React, { ReactNode } from "react";
import { Button } from "@chakra-ui/react";

interface Props {
    variant: "solid" | "outline" | "ghost" | "link";
    type?: "button" | "submit" | "reset" | undefined;
    className?: string;
    text: string;
    Icon?:
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | undefined;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    isLoading?: boolean | undefined;
    loadingText?: React.ReactNode;
}

function PageButton({
    variant,
    className,
    text,
    Icon,
    onClick,
    isLoading,
    type,
    loadingText,
}: Props) {
    return !Icon ? (
        <Button
            loadingText={loadingText || "Submitting"}
            type={type}
            isLoading={isLoading}
            variant={variant}
            className={className}
            onClick={onClick}
        >
            {text}
        </Button>
    ) : (
        <Button
            isLoading={isLoading}
            variant={variant}
            className={className}
            leftIcon={Icon}
            onClick={onClick}
        >
            {text}
        </Button>
    );
}

export default PageButton;
