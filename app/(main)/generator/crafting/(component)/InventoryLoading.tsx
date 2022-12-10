import RainbowButton from '@components/form/Button/Rainbow';
import Add from '@icons/Common/Add';
import FormInput from '@components/form/input';
import React from 'react';
import HardelLoader from '@components/loader/HardelLoader';

export default function InventoryLoading() {
    return (
        <div className={'my-10'}>
            <div className={'mb-4'}>
                <div className={'flex justify-between items-center mb-4'}>
                    <p className={'text-white text-2xl font-normal mb-0 font-minecraft'}>Minecraft Items</p>
                    <RainbowButton disabled className={'flex justify-center items-center'}>
                        <Add className={'w-8 h-8 fill-white mr-2'} />
                        Loading...
                    </RainbowButton>
                </div>
                <FormInput type="text" placeholder="Loading..." disabled />
            </div>
            <div className={'mb-4'}>
                <div className={'h-10 w-[200px] bg-zinc-700 animate-pulse rounded-md'} />
            </div>
            <hr />
            <div className={'flex'}>
                <div
                    className={'flex flex-auto min-h-[300px] max-h-[600px] bg-black/20 border border-white/20 rounded-r-xl overflow-y-auto'}
                >
                    <div className={'flex items-center justify-center w-full h-full p-4'}>
                        <HardelLoader />
                    </div>
                </div>
            </div>
        </div>
    );
}
