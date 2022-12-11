import React from 'react';
import { MinecraftCategoryData } from '@definitions/minecraft';
import Inventory from '@main/generator/crafting/(component)/Inventory';
import { notFound } from 'next/navigation';

type Props = {
    categories: Promise<Array<MinecraftCategoryData>>;
};

export default async function InventoryManager(props: Props) {
    const data = await props.categories;
    if (!(data.length > 0)) {
        notFound();
    }

    return <Inventory categories={data} />;
}
