import Image from 'next/image';
import Table from '@images/design/minecraft/custom_crafting_table.png';
import Arrow from '@images/design/minecraft/arrow.png';
import InventoryManager from '@main/tools/crafting/InventoryManager';
import MinecraftSlot from '@components/minecraft/MinecraftSlot';
import CraftingGroupButton from '@main/tools/crafting/CraftingGroupButton';
import CraftingOptions from './CraftingOptions';
import CodePreview from '@main/tools/crafting/CodePreview';
import ItemTooltip from '@components/minecraft/ItemTooltip';
import DNDContextProvider from '@components/dnd/DNDContext';
import CraftingContextProvider from '@main/tools/crafting/Context';
import React from 'react';
import { MinecraftCategoryData } from '@definitions/minecraft';
import prisma from '@libs/prisma';

async function getData() {
    const categories = await prisma.category.findMany({
        include: {
            items: {
                where: {
                    custom: false
                },
                select: {
                    minecraftId: true,
                    name: true,
                    asset: true
                }
            }
        }
    });

    const data: Array<MinecraftCategoryData> = categories.map((category) => {
        return {
            id: category.id,
            name: category.name,
            asset: `${process.env.ASSET_PREFIX}/minecraft/items/${category.asset}`,
            items: category.items.map((item) => {
                return {
                    id: item.minecraftId,
                    name: item.name,
                    image: `${process.env.ASSET_PREFIX}/minecraft/items/${item.asset}`
                };
            })
        };
    });

    return data;
}

export default async function Page() {
    const data = await getData();

    return (
        <DNDContextProvider>
            <CraftingContextProvider>
                <div className={'flex flex-col md:flex-row'}>
                    <div className={'flex flex-col w-full md:w-1/2'}>
                        <div className={'pl-10 pr-5 my-10'}>
                            <div className={'glassmorphism relative'}>
                                <CraftingGroupButton />
                                <div className={'my-6 flex justify-center'}>
                                    <div>
                                        <p className={'text-xl font-normal text-white text-start minecraft'}>Crafting table</p>
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
        </DNDContextProvider>
    );
}
