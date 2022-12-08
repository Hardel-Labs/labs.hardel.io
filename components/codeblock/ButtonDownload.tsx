'use client';

import Download from '@icons/Common/Download';
import { useEffect, useState } from 'react';
import Checked from '@icons/mark/Checked';

export default function ButtonDownload(props: { snippet: string }) {
    const [pending, setPending] = useState<boolean>(false);

    const download = () => {
        const element = document.createElement('a');
        const file = new Blob([props.snippet], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'snippet.json';
        document.body.appendChild(element);
        element.click();
        setPending(true);
    };

    useEffect(() => {
        if (pending) {
            setTimeout(() => setPending(false), 3000);
        }
    }, [pending]);

    return (
        <div className={'w-12 h-12 p-2 hover:bg-black/30 cursor-pointer transition bg-black/10 border border-white/20 rounded-md '}>
            {pending ? <Checked className={'w-full h-full fill-green-700'} /> : <Download onClick={() => download()} className={'fill-zinc-400'} />}
        </div>
    );
}
