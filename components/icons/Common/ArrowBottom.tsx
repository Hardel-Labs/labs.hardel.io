import { SVGProps } from 'react';

export default function ArrowBottom(props: SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowBottom">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z"></path>
        </svg>
    );
}
