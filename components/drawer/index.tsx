import React from 'react';
import Cross from '@icons/Common/Cross';

type Props = {
    title?: string;
    description?: string;
    onClose?: () => void;
    children: React.ReactNode;
    isOpened?: boolean;
};

export type DrawerProps = { id: string; title: string; description: string; component?: React.ReactNode };

export default function Drawer(props: Props) {
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (props.isOpened) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [props.isOpened]);

    return (
        <>
            {props.isOpened && <div className={'fixed top-0 right-0 h-screen w-screen bg-black/30 z-50'} onClick={() => props.onClose?.()} />}
            <div ref={ref} className={'fixed z-50 top-0 right-0 h-screen overflow-hidden transition-all duration-300 ease-in-out'} style={{ width: props.isOpened ? 650 : 0 }}>
                <div className={'py-4 h-full w-[650px]'}>
                    <div className={'glassmorphism h-full flex flex-col rounded-br-none rounded-tr-none p-4'}>
                        <div className={'flex-auto'}>
                            <div className={'flex justify-between items-center mb-2'}>
                                <p className={'text-2xl font-bold mb-2'}>{props.title ?? 'Drawer'}</p>
                                <Cross onClick={props.onClose} className={'fill-white scale-125 transition-[fill] cursor-pointer'} />
                            </div>
                            <p className={'text-gray-400 text-sm font-normal mb-0'}>{props.description}</p>
                            <hr />
                        </div>
                        <div className={'h-full overflow-y-auto bg-black/50 rounded-xl p-4'}>{props.children}</div>
                    </div>
                </div>
            </div>
        </>
    );
}
