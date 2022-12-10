'use client';

import React, { useMemo } from 'react';
import RainbowButton from '@components/form/Button/Rainbow';
import Add from '@icons/Common/Add';
import { MinecraftCategoryData } from '@definitions/minecraft';
import Category from '@components/minecraft/Category';
import GroupButtonContainer from '@components/form/Button/GroupButton/GroupButtonContainer';
import GroupButtonItem from '@components/form/Button/GroupButton/GroupButtonItem';
import { InventoryType } from '@libs/constant';
import DraggableMinecraftItem from '@components/minecraft/DraggableMinecraftItem';
import FormInput from '@components/form/input';

type Props = {
    categories: Array<MinecraftCategoryData>;
};

export default function Inventory(props: Props) {
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
                    <p className={'text-white text-2xl font-normal mb-0 font-minecraft'}>Minecraft Items</p>
                    <RainbowButton className={'flex justify-center items-center'}>
                        <Add className={'w-8 h-8 fill-white mr-2'} />
                        Add new item
                    </RainbowButton>
                </div>
                <FormInput type="text" placeholder="Search an item" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className={'mb-4'}>
                <GroupButtonContainer defaultValue={InventoryType.SEARCH}>
                    <GroupButtonItem id={InventoryType.SEARCH} onSelect={() => setType(InventoryType.SEARCH)}>
                        Search
                    </GroupButtonItem>
                    <GroupButtonItem id={InventoryType.VANILLA} onSelect={() => setType(InventoryType.VANILLA)}>
                        Vanilla
                    </GroupButtonItem>
                    <GroupButtonItem id={InventoryType.CUSTOM} onSelect={() => setType(InventoryType.CUSTOM)}>
                        Custom
                    </GroupButtonItem>
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

                <div
                    className={'flex flex-auto min-h-[300px] max-h-[600px] bg-black/20 border border-white/20 rounded-r-xl overflow-y-auto'}
                >
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
                            <DraggableMinecraftItem key={index} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
