import React, { useId } from 'react';
import styles from './styles.module.scss';

type Props = {
    onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
    disabled?: boolean;
    label?: string;
    checked?: boolean;
};

export default function Switch(props: Props) {
    const id = useId();

    return (
        <label className={styles.toggle} htmlFor={id}>
            <input type="checkbox" disabled={props.disabled} defaultChecked={props.checked} className={styles.toggleInput} id={id} onClick={props.onClick} />
            <span className={styles.toggleTrack}>
                <span className={styles.toggleIndicator}>
                    <span className={styles.checkMark}>
                        <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
                            <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                        </svg>
                    </span>
                </span>
            </span>
            {props.label}
        </label>
    );
}
