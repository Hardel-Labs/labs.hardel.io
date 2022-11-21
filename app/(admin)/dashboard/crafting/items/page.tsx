import React from 'react';
import TooltipContextProvider from '@components/minecraft/ItemTooltip/TooltipContext';
import ItemTooltip from '@components/minecraft/ItemTooltip';
import ItemsManager from '@admin/dashboard/crafting/items/ItemsManager';

export default function Home() {
    return (
        <TooltipContextProvider>
            <ItemsManager />
            <ItemTooltip />
        </TooltipContextProvider>
    );
}
