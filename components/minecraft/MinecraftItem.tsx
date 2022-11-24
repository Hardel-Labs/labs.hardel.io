'use client';

import Image from 'next/image';
import { MinecraftItemData } from '@definitions/minecraft';
import React, { useContext } from 'react';
import { TooltipContext } from '@components/minecraft/ItemTooltip/TooltipContext';

type Props = {
    item: MinecraftItemData;
    onClick?: () => void;
};

export default function MinecraftItem(props: Props) {
    const { setHoveredItem } = useContext(TooltipContext);

    return (
        <span
            onMouseEnter={() => setHoveredItem(props.item)}
            onMouseLeave={() => setHoveredItem(undefined)}
            onClick={props.onClick}
            className={'w-14 h-14 p-[6px] relative opacity-60 hover:opacity-100 transition ease-in-out cursor-pointer'}
        >
            {props.item?.image && <Image alt={''} src={props.item.image} height={64} width={64} className={'w-full h-full pixelated'} />}
        </span>
    );
}
