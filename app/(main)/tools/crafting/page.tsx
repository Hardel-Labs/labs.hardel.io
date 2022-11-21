import Image from 'next/image';
import Table from '@images/design/minecraft/custom_crafting_table.webp';
import Arrow from '@images/design/minecraft/arrow.webp';
import InventoryManager from '@main/tools/crafting/InventoryManager';
import MinecraftSlot from '@components/minecraft/MinecraftSlot';
import CraftingGroupButton from '@main/tools/crafting/CraftingGroupButton';
import CraftingOptions from './CraftingOptions';
import CodePreview from '@main/tools/crafting/CodePreview';
import ItemTooltip from '@components/minecraft/ItemTooltip';
import DNDContextProvider from '@components/dnd/DNDContext';
import CraftingContextProvider from '@main/tools/crafting/CraftingContext';
import React from 'react';
import getCategories from '@libs/request/server/minecraft/category/get';
import TooltipContextProvider from '@components/minecraft/ItemTooltip/TooltipContext';
import { MinecraftCategoryData } from '@definitions/minecraft';

async function getData() {
    const categories = await getCategories();
    if (!categories.request.success) {
        throw new Error('Failed to get categories');
    }

    return categories.data as MinecraftCategoryData[];
}

export default async function Page() {
    const data = await getData();

    return (
        <DNDContextProvider>
            <TooltipContextProvider>
                <CraftingContextProvider>
                    <div className={'flex flex-col md:flex-row'}>
                        <div className={'flex flex-col w-full md:w-1/2'}>
                            <div className={'pl-10 pr-5 my-10'}>
                                <div className={'glassmorphism relative'}>
                                    <CraftingGroupButton />
                                    <div className={'my-6 flex justify-center'}>
                                        <div>
                                            <p className={'text-xl font-normal text-white text-start font-minecraft'}>Crafting table</p>
                                            <div className={'flex justify-between items-center w-[18rem]'}>
                                                <div className={'w-[10.5rem] flex flex-wrap'}>
                                                    {Array.from({ length: 9 }).map((i, index) => (
                                                        <MinecraftSlot id={'crafting:' + +index} key={index} />
                                                    ))}
                                                </div>
                                                <Image src={Arrow} alt={''} width={32} height={27} />
                                                <MinecraftSlot id={'crafting:result'} />
                                            </div>
                                        </div>
                                    </div>
                                    <CraftingOptions />
                                    <div className={'absolute top-0 right-0 w-16 h-16 m-6'}>
                                        <Image src={Table} alt={''} width={64} height={64} />
                                    </div>
                                </div>

                                <CodePreview />
                            </div>
                        </div>
                        <div className={'flex flex-col w-full md:w-1/2'}>
                            <div className={'pr-10 pl-5 my-10'}>
                                <div className={'glassmorphism px-10'}>
                                    <InventoryManager categories={data} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <ItemTooltip />
                </CraftingContextProvider>
            </TooltipContextProvider>
        </DNDContextProvider>
    );
}
