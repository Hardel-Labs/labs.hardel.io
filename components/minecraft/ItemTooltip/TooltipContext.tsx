'use client';

import React, { createContext } from 'react';
import { MinecraftItemData } from '@definitions/minecraft';

type TooltipContextData = {
    hoveredItem: MinecraftItemData | undefined;
    setHoveredItem: (item: MinecraftItemData | undefined) => void;
};

export const TooltipContext = createContext<TooltipContextData>({} as TooltipContextData);
export default function TooltipContextProvider({ children }: { children: React.ReactNode }) {
    const [hoveredItem, setHoveredItem] = React.useState<MinecraftItemData>();

    return <TooltipContext.Provider value={{ hoveredItem, setHoveredItem }}>{children}</TooltipContext.Provider>;
}
