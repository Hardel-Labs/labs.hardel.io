import React from 'react';
import styles from './styles.module.scss';

export default function RainbowButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return <button {...props} className={styles.button + ' px-8 hover:scale-90 transition-transform py-2 rounded-md bg-black text-white font-semibold ' + props.className} />;
}
