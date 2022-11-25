import React from 'react';
import TooltipContextProvider from '@components/minecraft/ItemTooltip/TooltipContext';
import ItemTooltip from '@components/minecraft/ItemTooltip';
import ItemsManager from '@admin/admin/dashboard/crafting/items/ItemsManager';
import getItems from '@libs/request/server/minecraft/items/get';
import { MinecraftItemData } from '@definitions/minecraft';

async function getData() {
    const response = await getItems();
    if (!response.request.success) {
        throw new Error('Failed to fetch API');
    }

    return response.data as MinecraftItemData[];
}

export default async function ItemsPage() {
    const data = await getData();

    return (
        <TooltipContextProvider>
            <ItemsManager data={data} />
            <ItemTooltip />
        </TooltipContextProvider>
    );
}
