import DroppableMinecraftSlot from '@components/minecraft/DroppableMinecraftSlot';
import Image from 'next/image';
import Arrow from '@images/design/minecraft/arrow.webp';
import React from 'react';

export default function DroppableCraftingTableGUI() {
    return (
        <div>
            <p className={'text-xl font-normal text-white text-start font-minecraft'}>Crafting table</p>
            <div className={'flex justify-between items-center w-[18rem]'}>
                <div className={'w-[10.5rem] flex flex-wrap'}>
                    {Array.from({ length: 9 }).map((_, index) => (
                        <DroppableMinecraftSlot id={'crafting:' + +index} key={index} />
                    ))}
                </div>
                <Image src={Arrow} alt={''} width={32} height={27} />
                <DroppableMinecraftSlot id={'crafting:result'} />
            </div>
        </div>
    );
}
