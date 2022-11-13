'use client';

import { useEffect, useState } from 'react';

export default function Skew() {
    const [skew, setSkew] = useState(30);

    useEffect(() => {
        window.addEventListener('scroll', () => setSkew(30 - window.scrollY / 10));
        return () => window.removeEventListener('scroll', () => setSkew(30 - window.scrollY / 10));
    }, []);

    return (
        <span
            className={'absolute -bottom-full left-0 w-full h-full -z-10 bg-accent-tertiary/20'}
            style={{
                transform: `skewY(${skew}deg)`
            }}
        />
    );
}
