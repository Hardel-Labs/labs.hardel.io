'use client';

import Image from 'next/image';
import { MinecraftItemData } from '@definitions/minecraft';
import React, { useContext } from 'react';
import { ProjectContext } from '@main/tools/Context';
import { CraftingContext } from '@main/tools/crafting/Context';
import Draggable from '@components/dnd/Draggable';

type Props = {
    item: MinecraftItemData;
};

export default function MinecraftItem(props: Props) {
    const { setHoveredItem } = useContext(ProjectContext);
    const { setSelectedItem } = useContext(CraftingContext);

    const handleClick = () => {
        setSelectedItem(props.item);
    };

    return (
        <Draggable
            draggableId={'minecraftItem'}
            item={props.item}
            spanAttributes={{
                className: 'w-14 h-14 p-[6px] relative opacity-60 hover:opacity-100 transition ease-in-out cursor-move',
                onMouseEnter: () => setHoveredItem(props.item),
                onMouseLeave: () => setHoveredItem(undefined),
                onClick: handleClick
            }}
        >
            <div>{props.item.image && <Image alt={''} src={props.item.image} height={64} width={64} className={'w-full h-full pixelated'} />}</div>
        </Draggable>
    );
}
