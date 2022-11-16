import React from 'react';
import DNDContextProvider from '@components/dnd/DNDContext';
import CraftingContextProvider from '@app/tools/crafting/Context';
import ItemTooltip from '@components/minecraft/ItemTooltip';

export default async function CraftingLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <DNDContextProvider>
                <CraftingContextProvider>{children}</CraftingContextProvider>
            </DNDContextProvider>
            <ItemTooltip />
        </>
    );
}
