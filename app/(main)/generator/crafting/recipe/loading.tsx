import React from 'react';
import SkeletonCraftingTableGUI from '@components/minecraft/gui/crafting/Loading';
import WhiteButton from '@components/form/Button/White';
import FormInput from '@components/form/input';

export default function Loading() {
    return (
        <div className={'p-10'}>
            <div className={'flex justify-between items-center mb-8'}>
                <div className={'flex gap-x-4'}>
                    <WhiteButton disabled>Loading...</WhiteButton>
                    <FormInput type="text" placeholder="Loading..." className={'w-full max-w-[500px]'} />
                </div>
            </div>
            <hr />
            <div className={'grid grid-cols-craft gap-8'}>{Array(9).fill(<SkeletonCraftingTableGUI />)}</div>
        </div>
    );
}
