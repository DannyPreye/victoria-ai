"use client";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
    children: ReactNode;
}
const Modal = ({ children }: Props) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        return () => setMounted(false);
    }, []);

    return mounted
        ? createPortal(children, document.querySelector("#portal") as Element)
        : null;
};

export default Modal;
