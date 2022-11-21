'use client';

import AdminPagination from '@components/admin/AdminPagination';
import { MinecraftItemData } from '@definitions/minecraft';
import Image from 'next/image';
import React, { useContext } from 'react';
import { TooltipContext } from '@components/minecraft/ItemTooltip/TooltipContext';
import useSWR from 'swr';
import fetcher from '@libs/request/client/fetcher';
import Drawer from '@components/drawer';
import CreateItem from '@admin/dashboard/crafting/items/CreateItem';
import Harion from '@images/harion.webp';

const drawers = [
    { id: 'create', title: 'Create Item', description: 'Create a new item', component: <div>Test</div> },
    { id: 'config', title: 'Configuration', description: 'Item description', children: <div>Item</div> }
];

function UsersCard() {
    return (
        <div className={'flex justify-between items-center gap-x-4 bg-zinc-900 p-4 border-gold border cursor-pointer rounded-md opacity-50 hover:opacity-100 transition-[opacity]'}>
            <div className={'w-8 h-8 flex-shrink-0'}>
                <Image src={Harion} alt={'Harion'} width={64} height={64} className={'rounded-full h-full w-full'} />
            </div>
            <div className={'flex-1'}>
                <p className="text-xl mb-0 font-bold break-all">Hardel</p>
                <small className="text-sm text-gray-400 font-bold break-words">12 Projects.</small>
            </div>
        </div>
    );
}

export default function ItemsManager() {
    const { setHoveredItem } = useContext(TooltipContext);
    const { data } = useSWR<MinecraftItemData[]>('/api/minecraft/items', fetcher);
    const [isOpened, setIsOpened] = React.useState(false);

    return (
        <AdminPagination data={data} filterBy={'name'} title={'Items'} onAdd={() => setIsOpened(true)}>
            {(items: MinecraftItemData[]) => (
                <>
                    <div className={'my-10 flex gap-x-4'}>
                        {/*<div className={'bg-black/20 border border-white/20 rounded-l-xl w-[350px] h-fit min-h-[250px] max-h-[600px] overflow-y-auto'}>*/}
                        {/*    <div className={'px-4'}>*/}
                        {/*        <p className={'text-white text-xl font-bold pt-4'}>Users :</p>*/}
                        {/*        <FormInput placeholder={'Search'} />*/}
                        {/*        <hr className={'mt-0'} />*/}
                        {/*    </div>*/}
                        {/*    /!*<div className={'h-full p-4 flex gap-y-2 flex-col flex-wrap'}>*!/*/}
                        {/*    /!*</div>*!/*/}
                        {/*    <div className={'flex justify-center items-center pt-4'}>*/}
                        {/*        <p className={'text-white text-xl mb-0 font-bold'}>Search an user</p>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className={'flex flex-auto h-fit min-h-[250px] max-h-[400px] bg-black/20 border border-white/20 rounded-r-xl overflow-y-auto'}>
                            <div className={'h-full p-4 flex flex-wrap items-start content-start'}>
                                {items?.map((item, index) => (
                                    <span
                                        onMouseEnter={() => setHoveredItem(item)}
                                        onMouseLeave={() => setHoveredItem(undefined)}
                                        onClick={() => setIsOpened(true)}
                                        key={index}
                                        className={'w-14 h-14 p-[6px] relative opacity-60 hover:opacity-100 transition ease-in-out cursor-pointer'}
                                    >
                                        {item?.image && <Image alt={''} src={item.image} height={64} width={64} className={'w-full h-full pixelated'} />}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Drawer title={'Items: '} description={'Ceci est une jolie description pour essayer'} isOpened={isOpened} onClose={() => setIsOpened(false)}>
                        <CreateItem onClose={() => setIsOpened(false)} />
                    </Drawer>
                </>
            )}
        </AdminPagination>
    );
}
