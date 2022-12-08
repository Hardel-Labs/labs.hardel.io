import LoadingSlot from '@components/minecraft/LoadingSlot';
import Image from 'next/image';
import Arrow from '@images/design/minecraft/arrow.webp';
import React from 'react';

export default function SkeletonCraftingTableGUI() {
    return (
        <div className={'p-4 glassmorphism flex justify-center'}>
            <div>
                <div className={'w-[10rem] mb-2 h-4 bg-zinc-700 rounded-md animate-pulse'} />
                <div className={'flex justify-between items-center w-[18rem]'}>
                    <div className={'w-[10.5rem] flex flex-wrap'}>
                        {Array.from({ length: 9 }).map((_, index) => (
                            <LoadingSlot key={index} />
                        ))}
                    </div>
                    <Image src={Arrow} alt={''} width={32} height={27} />
                    <LoadingSlot />
                </div>
            </div>
        </div>
    );
}
