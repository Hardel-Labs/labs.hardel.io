'use client';

import useClickOutside from '@libs/hooks/useClickOutside';
import React, { useEffect, useRef } from 'react';

type Props = {
    children: React.ReactNode;
    open: boolean;
    onClose?: () => void;
};

export default function Modal(props: Props) {
    const ref = useRef<HTMLDivElement>(null);
    useClickOutside(ref, () => props.onClose?.());

    useEffect(() => {
        if (props.open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [props.open]);

    return (
        <div
            className="overflow-y-auto overflow-x-hidden bg-black/80 fixed top-0 right-0 left-0 z-50 p-4 md:inset-0 h-modal md:h-full"
            style={{ display: props.open ? 'block' : 'none' }}
        >
            <div className="relative flex justify-center items-center h-full">
                <div ref={ref} className="relative rounded-lg shadow glassmorphism">
                    {props.children}
                </div>
            </div>
        </div>
    );
}
