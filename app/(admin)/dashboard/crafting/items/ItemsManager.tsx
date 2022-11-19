'use client';

import useSWR from 'swr';
import fetcher from '@libs/fetcher';
import Image from 'next/image';
import React from 'react';
import { MinecraftItemData } from '@definitions/minecraft';

export default function ItemsManager() {
    const { data: items } = useSWR<MinecraftItemData[]>('/api/minecraft/items', fetcher);

    return (
        <>
            {items?.map((item, index) => (
                <span key={index} className={'w-14 h-14 p-[6px] relative opacity-60 hover:opacity-100 transition ease-in-out cursor-move'}>
                    {item?.image && <Image alt={''} src={item.image} height={64} width={64} className={'w-full h-full pixelated'} />}
                </span>
            ))}
        </>
    );
}
