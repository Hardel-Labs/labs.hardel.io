import React, { SVGProps } from 'react';

export function Download(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" {...props}>
            <path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7l7-7z"></path>
        </svg>
    );
}
export default Download;
