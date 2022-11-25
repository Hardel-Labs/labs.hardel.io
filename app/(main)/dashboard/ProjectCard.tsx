import Image from 'next/image';
import Harion from '@images/harion.webp';
import InvitationBadge from '@components/badge/Invitation';
import React from 'react';
import { ProjectData } from '@repositories/Project';

type Props = {
    project: ProjectData;
    basePath?: string;
    isSelected?: boolean;
};

const clx = (...args: string[]) => args.join(' ');

export default function ProjectCard(props: Props) {
    return (
        <div
            className={clx(
                'bg-black/50 border rounded-xl py-4 px-6 hover:scale-90 transition ease-in-out duration-300 cursor-pointer',
                props.project.name ? 'border-zinc-700' : 'border-gold'
            )}
        >
            <div className={'flex justify-between items-center'}>
                <div className="flex items-center w-fit">
                    <div className="flex-shrink-0">
                        <Image className="rounded-full" width={32} height={32} src={`${props.basePath}/${props.project.asset}` ?? Harion} alt="user photo" />
                    </div>
                    <div className="pl-3">
                        <span className="block text-lg font-semibold text-white">{props.project.name}</span>
                        <span className="block text-sm font-medium break-keep text-gray-500 truncate max-w-[12rem]">Version: {props.project.version}</span>
                    </div>
                </div>
                <InvitationBadge />
            </div>
            <hr />
            <div className={''}>
                <p className={'text-sm text-gray-500'}>{props.project.description}</p>
                <div className={'text-sm text-gray-300'}>
                    <span>8 days ago</span>
                </div>
            </div>
        </div>
    );
}
