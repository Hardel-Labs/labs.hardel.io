import HardelLetter from '@icons/logo/HardelLetter';
import React from 'react';
import { clx } from '@libs/utils';

export default function HardelLoader(props: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div {...props} className={clx('animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gold flex justify-between items-center', props.className)}>
            <HardelLetter className={'w-full h-full fill-zinc-500'} />
        </div>
    );
}
