import React from 'react';
import InventoryManager from '@admin/dashboard/crafting/category/InventoryManager';
import getCategories from '@libs/request/server/minecraft/category/get';
import { MinecraftCategoryData } from '@definitions/minecraft';
import TooltipContextProvider from '@components/minecraft/ItemTooltip/TooltipContext';
import ItemTooltip from '@components/minecraft/ItemTooltip';

async function getData() {
    const categories = await getCategories();
    if (!categories.request.success) {
        throw new Error('Failed to get categories');
    }

    return categories.data as MinecraftCategoryData[];
}

export default async function CategoriesPage() {
    const data = await getData();

    return (
        <TooltipContextProvider>
            <InventoryManager data={data} />
            <ItemTooltip />
        </TooltipContextProvider>
    );
}
