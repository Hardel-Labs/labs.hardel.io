'use client';

import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { GroupButtonContext } from '@components/form/Button/GroupButton/GroupButtonContext';

type Props = {
    id: string;
    children: string;
    className?: string;
    style?: React.CSSProperties;
    onSelect?: () => void;
};

export default function GroupButtonItem(props: Props) {
    const { setDomElement, currentElement, setCurrentElement } = useContext(GroupButtonContext);
    const refInner = React.createRef<HTMLSpanElement>();

    const isSelected = useMemo(() => {
        return currentElement === props.id;
    }, [currentElement, props.id]);

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement> | HTMLSpanElement) => {
            const target = e instanceof HTMLSpanElement ? e : (e.currentTarget?.firstChild as HTMLSpanElement);
            setDomElement(target);
            !isSelected && setCurrentElement(props.id);
            props.onSelect && props.onSelect();
        },
        [isSelected, props, setCurrentElement, setDomElement]
    );

    useEffect(() => {
        refInner.current && isSelected && handleClick(refInner.current);
    }, [handleClick, isSelected, refInner]);

    useEffect(() => {
        if (props.id === currentElement) {
            refInner.current && handleClick(refInner.current);
        }
    }, [currentElement, handleClick, props.id, refInner]);

    return (
        <button onClick={handleClick} className={'z-50'} style={props.style}>
            <span ref={refInner} className={'text-sm font-normal cursor-pointer transition px-4 hover:opacity-80'}>
                {props.children}
            </span>
        </button>
    );
}
