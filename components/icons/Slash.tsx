import React, { SVGProps } from 'react';

export function Slash(props: SVGProps<SVGSVGElement>) {
    return (
        <svg width={40} height={40} stroke={'#3f3f46'} viewBox="0 0 24 24" {...props}>
            <path d="M16.88 3.549L7.12 20.451"></path>
        </svg>
    );
}
export default Slash;
