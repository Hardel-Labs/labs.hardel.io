'use client';

import React, { createContext } from 'react';

type DrawerContextData = {
    open: boolean;
    setOpen: (open: boolean) => void;
    defaultValue: any;
    setDefaultValue: (defaultValue: any) => void;
};

export const DrawerContext = createContext<DrawerContextData>({} as DrawerContextData);
export default function DrawerContextProvider(props: { children: React.ReactNode }) {
    const [open, setOpen] = React.useState(false);
    const [defaultValue, setDefaultValue] = React.useState<any>(null);

    return <DrawerContext.Provider value={{ open, setOpen, defaultValue, setDefaultValue }}>{props.children}</DrawerContext.Provider>;
}
