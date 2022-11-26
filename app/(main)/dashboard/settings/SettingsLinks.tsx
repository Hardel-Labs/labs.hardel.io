'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { clx } from '@libs/utils';

type Props = {
    href: string;
    children: string;
};

export default function SettingsLinks(props: Props) {
    const pathname = usePathname();

    return (
        <Link
            className={clx(
                'px-4 py-2 rounded-md transition duration-300 ease-in-out',
                props.href === pathname ? 'bg-[#7c5a0d] text-zinc-200 hover:text-white' : 'hover:bg-[#7c5a0d] hover:text-zinc-200'
            )}
            href={props.href}
        >
            {props.children}
        </Link>
    );
}
