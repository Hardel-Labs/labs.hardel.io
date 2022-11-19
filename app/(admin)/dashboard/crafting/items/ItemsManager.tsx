'use client';

import useSWR from 'swr';
import fetcher from '@libs/fetcher';
import Image from 'next/image';
import React, { useContext } from 'react';
import { MinecraftItemData } from '@definitions/minecraft';
import { TooltipContext } from '@components/minecraft/ItemTooltip/TooltipContext';

export default function ItemsManager() {
    const { setHoveredItem } = useContext(TooltipContext);
    const { data: items } = useSWR<MinecraftItemData[]>('/api/minecraft/items', fetcher);

    return (
        <>
            {items?.slice(0, 50).map((item, index) => (
                <span
                    onMouseEnter={() => setHoveredItem(item)}
                    onMouseLeave={() => setHoveredItem(undefined)}
                    key={index}
                    className={'w-14 h-14 p-[6px] relative opacity-60 hover:opacity-100 transition ease-in-out cursor-pointer'}
                >
                    {item?.image && <Image alt={''} src={item.image} height={64} width={64} className={'w-full h-full pixelated'} />}
                </span>
            ))}
        </>
    );
}
