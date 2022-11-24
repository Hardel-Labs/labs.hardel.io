'use client';

import React, { useEffect, useMemo, useState } from 'react';
import useClickOutside from '@libs/hooks/useClickOutside';
import Cross from '@icons/Common/Cross';
import ArrowBottom from '@icons/Common/ArrowBottom';
import useSWR from 'swr';
import fetcher from '@libs/request/client/fetcher';
import { MinecraftItemData } from '@definitions/minecraft';
import Image from 'next/image';
import { RingLoader } from 'react-spinners';

type Props = {
    onChange?: (itemId: MinecraftItemData | undefined) => void;
    value?: string;
};

export default function SelectItem(props: Props) {
    const { data: items } = useSWR<MinecraftItemData[]>('/api/minecraft/items/lite', fetcher);
    const [search, setSearch] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<MinecraftItemData>();
    const ref = React.useRef<HTMLDivElement>(null);
    useClickOutside(ref, () => setOpen(false));

    const displayedOptions = useMemo(() => {
        return items?.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())).splice(0, 20);
    }, [items, search]);

    const handleSet = (option: MinecraftItemData) => {
        setSelected(option);
        props.onChange?.(option);
    };

    const handleRemove = () => {
        setSelected(undefined);
        props.onChange?.(undefined);
    };

    useEffect(() => {
        setSelected(items?.find((item) => item.minecraftId === props.value));
    }, [items, props.value]);

    return (
        <div ref={ref} className={'relative w-full'}>
            <div className={'border-2 border-solid border-white/20 rounded-md'} onClick={() => setOpen(true)}>
                <div className={'flex items-center justify-between p-2'}>
                    <div className={'flex flex-auto'}>
                        {selected && (
                            <div className={'flex items-center gap-x-2 bg-white/10 rounded-md px-2 py-1'}>
                                <div className={'w-6 h-6'}>
                                    <Image src={selected.image} className={'h-full w-full pixelated mr-2'} width={64} height={64} alt={''} />
                                </div>
                                <span className={'text-white text-sm'}>{selected.name}</span>
                            </div>
                        )}
                        {!items && (
                            <div className={'flex items-center gap-x-2 bg-white/10 rounded-md px-2 py-1'}>
                                <RingLoader color={'#fff'} size={16} />
                            </div>
                        )}
                        <input
                            type={'text'}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={'Search...'}
                            className={'bg-transparent text-sm px-2 py-1 text-white focus:outline-none'}
                        />
                    </div>
                    <div className={'flex'}>
                        <Cross className={'fill-white cursor-pointer w-4 h-4'} onClick={() => handleRemove()} />
                        <div className={'mx-2 bg-gray-400 w-[1px]'} />
                        <ArrowBottom className={'fill-white cursor-pointer w-4 h-4'} />
                    </div>
                </div>
            </div>

            {open && displayedOptions && displayedOptions.length > 0 && (
                <div className={'absolute w-full max-h-[200px] overflow-y-auto bg-zinc-900 border-2 mt-1 p-2 border-white/20 rounded-md'}>
                    <div className={'flex flex-col gap-y-1'}>
                        {displayedOptions.map((option, index) => (
                            <div onClick={() => handleSet(option)} key={index} className={'px-2 py-1 rounded-md hover:bg-zinc-700 cursor-pointer'}>
                                <div className={'flex items-center gap-x-4'}>
                                    <Image src={option.image} className={'w-6 h-6 pixelated'} width={64} height={64} alt={''} />
                                    <span className={'text-white text-sm'}>{option.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
