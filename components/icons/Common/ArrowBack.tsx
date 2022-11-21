import { SVGProps } from 'react';

export default function ArrowBack(props: SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowBackIosIcon">
            <path d="M17.77 3.77 16 2 6 12l10 10 1.77-1.77L9.54 12z"></path>
        </svg>
    );
}
