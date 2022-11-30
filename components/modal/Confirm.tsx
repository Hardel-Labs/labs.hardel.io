'use client';

import RedButton from '@components/form/Button/Red';
import WhiteButton from '@components/form/Button/White';
import Cross from '@icons/Common/Cross';
import Warning from '@icons/Common/Warning';
import Modal from '@components/modal/index';

type Props = {
    children: string;
    open: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
};

export default function ConfirmModal(props: Props) {
    return (
        <Modal open={props.open} onClose={props.onClose}>
            <button
                onClick={() => props.onClose?.()}
                className={'absolute top-3 right-2.5 bg-transparent fill-zinc-400 hover:bg-zinc-700 hover:fill-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'}
            >
                <Cross />
            </button>
            <div className="p-6 text-center">
                <Warning className={'mx-auto mb-4 w-14 h-14 text-gray-200'} />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{props.children}</h3>
                <div className={'flex justify-center gap-x-4'}>
                    <RedButton onClick={() => props.onClose?.()}>Cancel</RedButton>
                    <WhiteButton onClick={() => props.onConfirm?.()}>Yes, I&apos;m sure</WhiteButton>
                </div>
            </div>
        </Modal>
    );
}
