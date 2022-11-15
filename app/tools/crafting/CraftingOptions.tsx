'use client';

import { useContext, useState } from 'react';
import { CraftingContext } from '@app/tools/crafting/Context';

export default function CraftingGroupButton() {
    const { setResultCount } = useContext(CraftingContext);
    const [count, setCount] = useState(1);

    return (
        <div className={'px-10 mb-8'}>
            <input
                type="text"
                className="bg-zinc-900 w-full text-sm border-2 mb-8 border-solid border-white/20 rounded-xl px-4 py-1 text-white focus:outline-none focus:border-gold"
                placeholder="Craft Name"
            />
            <input
                type="range"
                className="w-full"
                min={0}
                max={64}
                step={1}
                value={count}
                onChange={(e) => {
                    setCount(parseInt(e.target.value));
                    setResultCount(parseInt(e.target.value));
                }}
            />
        </div>
    );
}
