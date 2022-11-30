import React, { SVGProps } from 'react';

export function Unchecked(props: SVGProps<SVGSVGElement>) {
    return (
        <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
            <path d="M7 13v-2h10v2Z"></path>
        </svg>
    );
}
export default Unchecked;
