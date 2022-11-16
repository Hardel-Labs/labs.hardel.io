'use client';

import Image from 'next/image';
import React, { useContext, useMemo } from 'react';
import { MinecraftItemData } from '@definitions/minecraft';
import { ProjectContext } from '@app/tools/Context';
import { CraftingContext } from '@app/tools/crafting/Context';
import Droppable from '@components/dnd/Droppable';

type Props = {
    id: string;
};

export default function MinecraftSlot(props: Props) {
    const { setHoveredItem } = useContext(ProjectContext);
    const { setSlotItem, selectedItem, slots } = useContext(CraftingContext);
    const [isOver, setIsOver] = React.useState(false);

    const slot = useMemo(() => {
        return slots.find((slot) => slot.id === props.id);
    }, [props.id, slots]);

    const handleClick = () => (slot?.item ? setSlotItem(props.id, undefined) : setSlotItem(props.id, selectedItem));

    return (
        <Droppable
            handleDrop={(item: MinecraftItemData) => setSlotItem(props.id, item)}
            hovered={setIsOver}
            acceptId={['minecraftItem']}
            spanAttributes={{
                onClick: handleClick,
                className:
                    'border border-white/20 w-14 h-14 p-[4px] relative hover:bg-zinc-800' +
                    (isOver ? ' bg-zinc-700' : ' bg-black/50') +
                    (slot?.item ? ' cursor-pointer' : ' cursor-default'),
                onMouseEnter: () => setHoveredItem(slot?.item),
                onMouseLeave: () => setHoveredItem(undefined)
            }}
        >
            {slot?.item?.image && <Image alt={''} src={slot.item.image} height={64} width={64} className={'w-full h-full pixelated'} />}
            {slot?.item && slot?.count && <span className={'absolute bottom-0 right-0 text-xl text-white seven'}>{slot.count}</span>}
        </Droppable>
    );
}
