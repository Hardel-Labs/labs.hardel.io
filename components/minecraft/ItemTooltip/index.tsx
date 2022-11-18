'use client';

import styles from './styles.module.scss';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProjectContext } from '@main/tools/Context';

export default function ItemTooltip() {
    const { hoveredItem } = useContext(ProjectContext);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            let positionX = e.clientX + 10;
            let positionY = e.clientY - 20;
            if (positionX + (ref?.current?.offsetWidth ?? 0) > window.innerWidth - 50) {
                positionX = e.clientX - 10 - (ref?.current?.offsetWidth ?? 0);
            }

            setPosition({ x: positionX, y: positionY });
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <>
            {hoveredItem && (
                <div ref={ref} className={styles.itemTooltip} style={{ left: position.x, top: position.y }}>
                    <div className={styles.textTooltip}>
                        <div className={styles.name}>{hoveredItem.name}</div>
                        <div className={styles.lore}>{hoveredItem.id}</div>
                    </div>
                </div>
            )}
        </>
    );
}
