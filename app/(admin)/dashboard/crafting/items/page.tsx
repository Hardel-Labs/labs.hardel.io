import React from 'react';
import RainbowButton from '@components/form/Rainbow';
import Add from '@icons/Common/Add';
import ItemsManager from '@admin/dashboard/crafting/items/ItemsManager';
import TooltipContextProvider from '@components/minecraft/ItemTooltip/TooltipContext';
import ItemTooltip from '@components/minecraft/ItemTooltip';

export default async function Home() {
    return (
        <TooltipContextProvider>
            <section className={'overflow-hidden px-4 md:px-8'}>
                <div className={'container'}>
                    <hr />
                    <div className={'my-10'}>
                        <div className={'mb-4'}>
                            <div className={'flex justify-end items-center mb-4'}>
                                <RainbowButton className={'flex justify-center items-center'}>
                                    <Add className={'w-8 h-8 fill-white mr-2'} />
                                    Add new item
                                </RainbowButton>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className={'my-10'}>
                        <div className={'flex flex-auto min-h-[300px] max-h-[600px] bg-black/20 border border-white/20 rounded-r-xl overflow-y-auto'}>
                            <div className={'h-full p-4 flex flex-wrap items-start content-start'}>
                                <ItemsManager />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ItemTooltip />
        </TooltipContextProvider>
    );
}
