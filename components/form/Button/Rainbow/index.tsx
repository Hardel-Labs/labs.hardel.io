import React from 'react';
import styles from './styles.module.scss';
import { clx } from '@libs/utils';

export default function RainbowButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={clx(
                styles.button,
                'px-8 hover:scale-90 transition-transform py-2 rounded-md bg-black text-white font-semibold',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                props?.className
            )}
        />
    );
}
