'use client';

import React, { createContext, ReactNode, useCallback, useEffect } from 'react';

type GroupButtonContainerContextType = {
    setCurrentElement: (element: HTMLSpanElement) => void;
};

type Props = {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
};

const GroupButtonContext = createContext<GroupButtonContainerContextType>({} as GroupButtonContainerContextType);

export default function GroupButtonContainer(props: Props) {
    const refContainer = React.useRef<HTMLDivElement>(null);
    const [width, setWidth] = React.useState(0);
    const [positionX, setPositionX] = React.useState(0);
    const [currentElement, setCurrentElement] = React.useState<HTMLSpanElement | null>(null);

    const moveContent = useCallback(() => {
        if (currentElement) {
            setWidth(currentElement.offsetWidth);

            const rect = currentElement.getBoundingClientRect();
            if (refContainer.current) {
                const containerRect = refContainer.current.getBoundingClientRect();
                setPositionX(rect.left - containerRect.left - 16);
            }
        }
    }, [currentElement, refContainer]);

    useEffect(() => {
        moveContent();
    }, [moveContent]);

    return (
        <div className={'overflow-hidden overflow-x-auto'}>
            <GroupButtonContext.Provider value={{ setCurrentElement }}>
                <div
                    ref={refContainer}
                    className={'relative bg-[#3d3d3d] rounded-full flex items-center justify-center w-fit text-white py-2 px-1 ' + props.className}
                    style={props.style}
                >
                    {props.children}

                    {currentElement && (
                        <div
                            className={
                                'bg-black border border-zinc-500/50 absolute rounded-full z-40 transition-all ml-4 left-0 absolute h-[90%] py-1 px-2 duration-300 ease-in-out'
                            }
                            style={{ transform: `translateX(${positionX}px)`, width }}
                        ></div>
                    )}
                </div>
            </GroupButtonContext.Provider>
        </div>
    );
}

export { GroupButtonContext };

//.container {
//     position: relative;
//     background: rgba(149, 149, 149, 0.15);
//     border-radius: 9999px;
//     padding: 8px 4px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: fit-content;
//     color: #fff;
//
//     .innerBackground {
//         background: black;
//         border: 1px solid #787878;
//         padding: 4px 8px;
//         border-radius: 9999px;
//         height: 90%;
//         position: absolute;
//         z-index: 100;
//         left: 0;
//         margin-left: 16px;
//         transition: 0.6s ease;
//     }
// }
