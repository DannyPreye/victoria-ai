import ColorContextProvider from "@/contexts/ColorContext";

import React, { ReactNode } from "react";

interface Props {
    children: ReactNode;
}
const ColorProvider = ({ children }: Props) => {
    return <ColorContextProvider>{children}</ColorContextProvider>;
};

export default ColorProvider;
