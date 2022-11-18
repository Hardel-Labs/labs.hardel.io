'use client';

import React, { useMemo } from 'react';
import RainbowButton from '@components/form/Rainbow';
import Add from '@icons/Common/Add';
import MinecraftItem from '@components/minecraft/MinecraftItem';
import { MinecraftCategoryData } from '@definitions/minecraft';
import Category from '@components/minecraft/Category';
import GroupButtonContainer from '@components/form/GroupButton/GroupButtonContainer';
import GroupButtonItem from '@components/form/GroupButton/GroupButtonItem';
import { InventoryType } from '@libs/constant';

type Props = {
    categories: Array<MinecraftCategoryData>;
};

export default function InventoryManager(props: Props) {
    const [selected, setSelected] = React.useState<number>(props.categories[0].id);
    const [search, setSearch] = React.useState<string>('');
    const [type, setType] = React.useState<InventoryType>(InventoryType.SEARCH);

    const displayItems = useMemo(() => {
        if (type === InventoryType.SEARCH) {
            const items = [...props.categories].map((category) => category.items).flat();
            if (search.length < 3) return;

            return items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())).slice(0, 50);
        } else if (type === InventoryType.VANILLA) {
            const items = props.categories.find((category) => category.id === selected)?.items;
            if (!items) return null;

            return items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
        } else {
            return null;
        }
    }, [type, props.categories, selected, search]);

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
            <div className={'mb-4'}>
                <GroupButtonContainer>
                    <GroupButtonItem onSelect={() => setType(InventoryType.SEARCH)} title={'Search'} defaultChecked={true} />
                    <GroupButtonItem onSelect={() => setType(InventoryType.VANILLA)} title={'Vanilla'} />
                    <GroupButtonItem onSelect={() => setType(InventoryType.CUSTOM)} title={'Custom'} />
                </GroupButtonContainer>
            </div>
            <hr />
            <div className={'flex'}>
                {type === InventoryType.VANILLA && (
                    <div>
                        {props.categories.map((category, index) => (
                            <Category key={index} category={category} selected={selected} onClick={() => setSelected(category.id)} />
                        ))}
                    </div>
                )}

                <div className={'flex flex-auto min-h-[300px] max-h-[600px] bg-black/20 border border-white/20 rounded-r-xl overflow-y-auto'}>
                    {type === InventoryType.SEARCH && search.length > 2 && displayItems?.length === 0 && (
                        <div className={'flex items-center justify-center w-full h-full p-4'}>
                            <p className={'text-white text-center text-xl font-normal mb-0 minecraft'}>No results</p>
                        </div>
                    )}

                    {type === InventoryType.SEARCH && search.length <= 2 && (
                        <div className={'flex items-center justify-center w-full h-full p-4'}>
                            <p className={'text-white text-center text-font font-normal mb-0 minecraft'}>Search an item</p>
                        </div>
                    )}

                    {type === InventoryType.CUSTOM && (
                        <div className={'flex items-center justify-center w-full h-full p-4'}>
                            <p className={'text-white text-center text-font font-normal mb-0 minecraft'}>TODO: Custom items</p>
                        </div>
                    )}

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
