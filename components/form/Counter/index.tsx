'use client';

import styles from './index.module.scss';
import React, { useState } from 'react';

type Props = {
    value: number;
    onChange?: (value: number) => void;
    min: number;
    max: number;
    step: number;
};

export default function Counter(props: Props) {
    const [value, setValue] = useState(props.min);

    const increment = () => {
        const newValue = Math.min(value + props.step, props.max);
        setValue(newValue);
        props.onChange?.(newValue);
    };

    const decrement = () => {
        const newValue = Math.max(value - props.step, props.min);
        setValue(newValue);
        props.onChange?.(newValue);
    };

    return (
        <div className={styles.container}>
            <span onClick={increment} className={styles.next}></span>
            <span onClick={decrement} className={styles.prev}></span>
            <div className={styles.box}>
                {/*<input type="text" className={styles.input} value={value} onChange={handleChange} min={props.min} max={props.max} step={props.step} />*/}
                <span className={styles.value}>{value}</span>
            </div>
        </div>
    );
}
