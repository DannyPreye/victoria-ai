import AmsterdamTemplate from "@/components/templates/Amsterdam";
import BerlinTemplate from "@/components/templates/Berlin";
import CairoTemplate from "@/components/templates/Cairo";
import DubaiTemplate from "@/components/templates/Dubai";
import LondonTemplate from "@/components/templates/London";
import ParisTemplate from "@/components/templates/Paris";
import RomeTemplate from "@/components/templates/Rome";
import SydneyTemplate from "@/components/templates/Syndney";
import TokyoTemplate from "@/components/templates/Tokyo";
import { ReactNode } from "react";

export const templateType: { title: string, component: any; }[] = [
    {
        title: "London",
        component: LondonTemplate
    },
    {
        title: "Paris",
        component: ParisTemplate
    },
    {
        title: "Rome",
        component: RomeTemplate
    },
    {
        title: "Berlin",
        component: BerlinTemplate
    },
    {
        title: "Amsterdam",
        component: AmsterdamTemplate
    },
    {
        title: "Tokyo",
        component: TokyoTemplate
    },
    {
        title: "Dubai",
        component: DubaiTemplate
    },
    {
        title: "Cairo",
        component: CairoTemplate
    },
    {
        title: "Sydney",
        component: SydneyTemplate

    },
];
