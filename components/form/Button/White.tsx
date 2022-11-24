import React from 'react';

export default function WhiteButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return <button {...props} className={'px-8 hover:scale-90 transition-transform py-2 rounded-md bg-white text-black font-semibold border-gray-600 border ' + props.className} />;
}
