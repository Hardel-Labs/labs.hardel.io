'use client';

import React, { createContext } from 'react';

type DrawerContextData = {
    open: boolean;
    setOpen: (open: boolean) => void;
    children: any;
    setChildren: (children: any) => void;
};

export const DrawerContext = createContext<DrawerContextData>({} as DrawerContextData);
export default function DrawerContextProvider(props: { children: React.ReactNode }) {
    const [open, setOpen] = React.useState(false);
    const [children, setChildren] = React.useState<React.ReactNode>(null);

    return <DrawerContext.Provider value={{ open, setOpen, children, setChildren }}>{props.children}</DrawerContext.Provider>;
}
