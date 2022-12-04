import React from 'react';

function LoadingDay(props: { children: React.ReactNode }) {
    return (
        <li className="mb-10 ml-4">
            <div className="absolute w-3 h-3 rounded-full my-1.5 -left-1.5 border-zinc-900 bg-zinc-700"></div>
            <div className={'mb-4'}>
                <time className="text-sm font-normal leading-none text-gray-500">Loading...</time>
            </div>
            {props.children}
        </li>
    );
}

function LoadingItem() {
    return (
        <div className={'flex justify-between items-center mb-2 py-1 px-4'}>
            <div className={'flex items-center gap-x-4'}>
                <div className={'w-4 h-4 rounded-full bg-zinc-700 animate-pulse'} />
                <div className={'h-4 w-32 bg-zinc-700 rounded animate-pulse'} />
            </div>
            <div className={'flex items-center gap-x-4'}>
                <div className={'w-4 h-4 animate-pulse rounded-full bg-zinc-700'} />
                <div className={'h-4 w-32 bg-zinc-700 rounded animate-pulse'} />
            </div>
        </div>
    );
}

export default function LoadingActivity() {
    return (
        <>
            <div className={'animate-pulse mb-4 h-6 w-32 bg-zinc-700 rounded'} />
            <div className={'px-5'}>
                <ol className="relative border-l border-zinc-700">
                    <LoadingDay>
                        <LoadingItem />
                        <LoadingItem />
                        <LoadingItem />
                        <LoadingItem />
                        <LoadingItem />
                    </LoadingDay>
                    <LoadingDay>
                        <LoadingItem />
                        <LoadingItem />
                        <LoadingItem />
                    </LoadingDay>
                    <LoadingDay>
                        <LoadingItem />
                        <LoadingItem />
                    </LoadingDay>
                </ol>
            </div>

            <div className={'animate-pulse mb-4 h-6 w-32 bg-zinc-700 rounded'} />
            <div className={'px-5'}>
                <ol className="relative border-l border-zinc-700">
                    <LoadingDay>
                        <LoadingItem />
                        <LoadingItem />
                        <LoadingItem />
                        <LoadingItem />
                        <LoadingItem />
                    </LoadingDay>
                    <LoadingDay>
                        <LoadingItem />
                        <LoadingItem />
                    </LoadingDay>
                </ol>
            </div>
        </>
    );
}
