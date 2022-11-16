'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

const diamondSize = 63;
export default function HighlightDiamonds() {
    const ref = useRef<HTMLDivElement>(null);
    const [diamonds, setDiamonds] = useState<Position2D[]>();
    const screenWidth = ref.current?.parentElement?.clientWidth ?? 0;
    const screenHeight = ref.current?.parentElement?.clientHeight ?? 0;

    const getRandomPosition = useCallback((): Position2D => {
        const maxX = screenWidth / diamondSize;
        const maxY = screenHeight / diamondSize;

        const x = Math.floor(Math.random() * maxX - 1);
        const y = Math.floor(Math.random() * maxY - 1);
        return { x, y };
    }, [screenWidth, screenHeight]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newDiamonds = Array.from({ length: 3 }, () => getRandomPosition());
            setDiamonds(newDiamonds);
        }, 2000);

        return () => clearInterval(interval);
    }, [diamonds, getRandomPosition]);

    return (
        <div ref={ref}>
            <React.Fragment>
                {diamonds?.map((position, index) => (
                    <Diamond key={index} position={position} />
                ))}
            </React.Fragment>
        </div>
    );
}

const Diamond = ({ position }: { position: Position2D }) => {
    return (
        <span
            className={'absolute -z-10 bg-zinc-700 pt-1 top-0 left-0 h-[63px] w-[63px] animate-pulse-void'}
            style={{
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                transform: `translate(${position.x * diamondSize}px, ${position.y * diamondSize}px)`
            }}
        />
    );
};
