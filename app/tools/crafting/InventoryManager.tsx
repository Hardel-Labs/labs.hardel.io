'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import RainbowButton from '@components/form/Rainbow';
import Add from '@icons/Common/Add';
import MinecraftItem from '@components/minecraft/MinecraftItem';
import { MinecraftCategoryData } from '@definitions/minecraft';

type Props = {
    categories: Array<MinecraftCategoryData>;
};

export default function InventoryManager(props: Props) {
    const [selected, setSelected] = React.useState<number>(props.categories[0].id);
    const [search, setSearch] = React.useState<string>('');

    const displayItems = useMemo(() => {
        const items = props.categories.find((category) => category.id === selected)?.items;
        if (!items) return null;

        return items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    }, [props.categories, selected, search]);

    return (
        <div className={'my-10'}>
            <div className={'mb-4'}>
                <div className={'flex justify-between items-center mb-4'}>
                    <p className={'text-white text-2xl font-normal mb-0 minecraft'}>Minecraft Items</p>
                    <RainbowButton className={'flex justify-center items-center'}>
                        <Add className={'w-8 h-8 fill-white mr-2'} />
                        Add new item
                    </RainbowButton>
                </div>
                <input
                    type="text"
                    className="bg-zinc-900 w-full text-sm border-2 border-solid border-white/20 rounded-xl px-4 py-1 text-white focus:outline-none focus:border-gold"
                    placeholder="Search an item"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <hr />
            <div className={'flex'}>
                <div>
                    {props.categories.map((category, index) => (
                        <span
                            key={index}
                            className={
                                'block border-y border-l relative rounded-tl-xl rounded-bl-xl mb-[2px] align-middle w-12 h-12 p-[8px] cursor-pointer' +
                                (category.id === selected ? ' bg-black/20 opacity-100 border-white/20' : ' bg-black opacity-10 border-zinc-500 hover:opacity-70 hover:bg-zinc-800')
                            }
                            onClick={() => setSelected(category.id)}
                        >
                            <span className={'absolute top-0 bottom-0 right-[-1px] w-[1px] bg-zinc-800'} />
                            <Image alt={''} src={category.asset} height={64} width={64} className={'w-full h-full pixelated'} />
                        </span>
                    ))}
                </div>
                <div className={'flex flex-auto max-h-[500px] bg-black/20 border border-white/20 rounded-r-xl overflow-y-auto'}>
                    <div className={'h-full p-4 flex flex-wrap items-start content-start'}>
                        {displayItems?.map((item, index) => (
                            <MinecraftItem key={index} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
