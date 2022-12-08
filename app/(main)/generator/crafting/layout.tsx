import React from 'react';
import CraftingContextProvider from '@main/generator/crafting/(component)/CraftingContext';

export default async function CraftingLayout({ children }: { children: React.ReactNode }) {
    return <CraftingContextProvider>{children}</CraftingContextProvider>;
}
