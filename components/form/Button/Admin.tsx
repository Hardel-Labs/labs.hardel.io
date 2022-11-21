import Add from '@icons/Common/Add';
import React from 'react';

type Props = {
    onClick: () => void;
    children: string;
};

export default function AdminCreateButton(props: Props) {
    return (
        <div
            className={
                'cursor-pointer flex items-center rounded-3xl border border-solid border-gray-200 pr-3 pl-2 py-1 w-fit transition hover:bg-white hover:bg-opacity-10 hover:border-opacity-20 hover:border-gray-400'
            }
            onClick={props.onClick}
        >
            <Add className={'fill-white w-5 h-5 inline mr-3'} />
            <span>{props.children}</span>
        </div>
    );
}
