import React from 'react';

export default function WhiteButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                'px-8 hover:scale-90 hover:shadow-gray-900 shadow-xl transition-transform py-2 rounded-md bg-white text-black font-semibold border-gray-600 border ' +
                props.className
            }
        />
    );
}
