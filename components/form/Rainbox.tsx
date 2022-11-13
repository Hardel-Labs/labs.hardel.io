import React from 'react';

export default function RainbowButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return <button {...props} className={'button-border-rainbow px-8 hover:scale-90 transition-transform py-2 rounded-md bg-black text-white font-semibold ' + props.className} />;
}
