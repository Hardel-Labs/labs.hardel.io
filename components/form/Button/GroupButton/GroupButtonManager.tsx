import React, { useCallback, useContext, useEffect } from 'react';
import { GroupButtonContext } from '@components/form/Button/GroupButton/GroupButtonContext';
import { GroupButtonProps } from '@components/form/Button/GroupButton/GroupButtonContainer';

export default function GroupButtonManager(props: GroupButtonProps) {
    const { domElement, setCurrentElement, currentElement } = useContext(GroupButtonContext);
    const refContainer = React.useRef<HTMLDivElement>(null);
    const [width, setWidth] = React.useState(0);
    const [positionX, setPositionX] = React.useState(0);

    const moveContent = useCallback(() => {
        if (domElement) {
            setWidth(domElement.offsetWidth);

            const rect = domElement.getBoundingClientRect();
            if (refContainer.current) {
                const containerRect = refContainer.current.getBoundingClientRect();
                setPositionX(rect.left - containerRect.left - 16);
            }

            props.onSelect && props.onSelect(currentElement);
        }
    }, [currentElement, domElement, props]);

    useEffect(() => {
        if (!props.value) return;

        setCurrentElement(props.value);
    }, [props.value, setCurrentElement]);

    useEffect(() => {
        if (!props.defaultValue) return;

        setCurrentElement(props.defaultValue);
    }, [props.defaultValue, setCurrentElement]);

    useEffect(() => {
        moveContent();
    }, [moveContent]);

    return (
        <div className={'overflow-hidden overflow-x-auto'}>
            <div
                ref={refContainer}
                className={'relative bg-[#3d3d3d] rounded-full flex items-center justify-center w-fit text-white py-2 px-1 ' + props.className}
                style={props.style}
            >
                {props.children}

                {domElement && (
                    <div
                        className={'bg-black border border-zinc-500/50 absolute rounded-full z-40 transition-all ml-4 left-0 absolute h-[90%] py-1 px-2 duration-300 ease-in-out'}
                        style={{ transform: `translateX(${positionX}px)`, width }}
                    ></div>
                )}
            </div>
        </div>
    );
}
