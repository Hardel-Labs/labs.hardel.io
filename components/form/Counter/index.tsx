'use client';

import styles from './index.module.scss';
import React from 'react';

type Props = {
    value: number;
    onChange?: (value: number) => void;
    min: number;
    max: number;
    step: number;
};

export default function Counter(props: Props) {
    const increment = () => {
        const newValue = Math.min(props.value + props.step, props.max);
        props.onChange?.(newValue);
    };

    const decrement = () => {
        const newValue = Math.max(props.value - props.step, props.min);
        props.onChange?.(newValue);
    };

    return (
        <div className={styles.container}>
            <span onClick={increment} className={styles.next}></span>
            <span onClick={decrement} className={styles.prev}></span>
            <div className={styles.box}>
                <span className={styles.value}>{props.value}</span>
            </div>
        </div>
    );
}
