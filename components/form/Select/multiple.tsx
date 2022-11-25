'use client';

import React, { useEffect, useMemo, useState } from 'react';
import useClickOutside from '@libs/hooks/useClickOutside';
import Cross from '@icons/Common/Cross';
import ArrowBottom from '@icons/Common/ArrowBottom';

export type Option = {
    id: string;
    name: string;
    shortName?: string;
};

type Props = {
    onChange?: (values: string[]) => void;
    values?: string[];
    options: Option[];
};

export default function SelectMultiple(props: Props) {
    const [value, setValue] = useState<string>('');
    const [options, setOptions] = useState<string[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const ref = React.useRef<HTMLDivElement>(null);
    useClickOutside(ref, () => setOpen(false));

    const displayedOptions = useMemo(() => {
        return props.options.filter((option) => !props.values?.find((value) => value === option.id)).filter((option) => option.name.toLowerCase().includes(value.toLowerCase()));
    }, [props.options, props.values, value]);

    const handleAdd = (option: Option) => {
        setOptions([...options, option.id]);
        props.onChange?.([...options, option.id]);
    };

    const handleRemove = (option: Option) => {
        setOptions(options.filter((o) => o !== option.id));
        props.onChange?.(options.filter((o) => o !== option.id));
    };

    const handleRemoveAll = () => {
        setOptions([]);
        setValue('');
        props.onChange?.([]);
    };

    useEffect(() => {
        setOptions(props.values || []);
    }, [props.values]);

    return (
        <div ref={ref} className={'relative w-full'}>
            <div className={'border-2 border-solid border-white/20 rounded-md'} onClick={() => setOpen(true)}>
                <div className={'flex items-center justify-between p-2'}>
                    <div className={'flex'}>
                        <div className={'flex gap-x-1'}>
                            {props.options
                                .filter((option) => options.find((o) => o === option.id))
                                .map((option, index) => (
                                    <div key={index} className={'flex items-center justify-center bg-white/10 rounded-md px-2'}>
                                        <span className={'text-white text-sm'}>{option.shortName ?? option.name}</span>
                                        <Cross className={'fill-white w-4 h-4 ml-2 cursor-pointer'} onClick={() => handleRemove(option)} />
                                    </div>
                                ))}
                        </div>
                        <input
                            type={'text'}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder={'Search...'}
                            className={'bg-transparent w-full text-sm px-2 py-1 text-white focus:outline-none'}
                        />
                    </div>
                    <div className={'flex'}>
                        <Cross className={'fill-white cursor-pointer w-4 h-4'} onClick={() => handleRemoveAll()} />
                        <div className={'mx-2 bg-gray-400 w-[1px]'} />
                        <ArrowBottom className={'fill-white cursor-pointer w-4 h-4'} />
                    </div>
                </div>
            </div>

            {open && displayedOptions.length > 0 && (
                <div className={'absolute w-full max-h-[200px] overflow-y-auto bg-zinc-900 border-2 mt-1 p-2 border-white/20 rounded-md'}>
                    <div className={'flex flex-col gap-y-1'}>
                        {displayedOptions.map((option, index) => (
                            <div onClick={() => handleAdd(option)} key={index} className={'px-2 py-1 rounded-md hover:bg-zinc-700 cursor-pointer'}>
                                {option.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
