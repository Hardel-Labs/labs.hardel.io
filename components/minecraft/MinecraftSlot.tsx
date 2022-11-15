'use client';

import Image from 'next/image';
import React, { useContext } from 'react';
import { MinecraftItemData } from '@definitions/minecraft';
import { ProjectContext } from '@app/tools/Context';
import { CraftingContext } from '@app/tools/crafting/Context';
import Droppable from '@components/dnd/Droppable';

type Props = {
    id: string;
};

export default function MinecraftSlot(props: Props) {
    const { setHoveredItem } = useContext(ProjectContext);
    const { setSlotItem, selectedItem } = useContext(CraftingContext);
    const [item, setItem] = React.useState<MinecraftItemData>();
    const [isOver, setIsOver] = React.useState(false);

    const handleClick = () => {
        if (item) {
            setItem(undefined);
            setSlotItem(props.id, undefined);
        } else {
            setSlotItem(props.id, selectedItem);
            setItem(selectedItem);
        }
    };

    const handleDrop = (item: MinecraftItemData) => {
        setItem(item);
        setSlotItem(props.id, item);
    };

    return (
        <Droppable
            handleDrop={handleDrop}
            hovered={setIsOver}
            acceptId={['minecraftItem']}
            spanAttributes={{
                onClick: handleClick,
                className:
                    'border border-white/20 w-14 h-14 p-[4px] relative hover:bg-zinc-800' +
                    (isOver ? ' bg-zinc-700' : ' bg-black/50') +
                    (item ? ' cursor-pointer' : ' cursor-default'),
                onMouseEnter: () => setHoveredItem(item),
                onMouseLeave: () => setHoveredItem(undefined)
            }}
        >
            {item?.image && <Image alt={''} src={item.image} height={64} width={64} className={'w-full h-full pixelated'} />}
        </Droppable>
    );
}
