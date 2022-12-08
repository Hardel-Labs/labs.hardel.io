'use client';

import FileCopy from '@icons/Common/FileCopy';
import { useEffect, useState } from 'react';
import Checked from '@icons/mark/Checked';

export default function ButtonCopy(props: { snippet: string }) {
    const [pending, setPending] = useState<boolean>(false);

    const copy = async () => {
        setPending(true);
        await navigator.clipboard.writeText(props.snippet);
    };

    useEffect(() => {
        if (pending) {
            setTimeout(() => setPending(false), 3000);
        }
    }, [pending]);

    return (
        <div className={'w-12 h-12 p-2 hover:bg-black/30 cursor-pointer transition bg-black/10 border border-white/20 rounded-md '}>
            {pending ? <Checked className={'w-full h-full fill-green-700'} /> : <FileCopy onClick={() => copy()} className={'fill-zinc-400'} />}
        </div>
    );
}
