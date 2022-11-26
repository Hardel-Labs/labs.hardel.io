'use client';

/* eslint react-hooks/exhaustive-deps: "off" */
import React, { useCallback, useContext, useEffect } from 'react';
import { GroupButtonContext } from '@components/form/Button/GroupButton/GroupButtonContainer';

type Props = {
    children: string;
    defaultChecked?: boolean;
    className?: string;
    style?: React.CSSProperties;
    onSelect?: () => void;
};

export default function GroupButtonItem(props: Props) {
    const { setCurrentElement } = useContext(GroupButtonContext);
    const refInner = React.createRef<HTMLSpanElement>();

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement> | HTMLSpanElement) => {
            const target = e instanceof HTMLSpanElement ? e : (e.currentTarget?.firstChild as HTMLSpanElement);
            setCurrentElement(target);
            props.onSelect && props.onSelect();
        },
        [props, setCurrentElement]
    );

    useEffect(() => {
        refInner.current && props.defaultChecked && handleClick(refInner.current);
    }, [props.defaultChecked]);

    return (
        <button onClick={handleClick} className={'z-50'} style={props.style}>
            <span ref={refInner} className={'text-sm font-normal cursor-pointer transition px-4 hover:opacity-80'}>
                {props.children}
            </span>
        </button>
    );
}
