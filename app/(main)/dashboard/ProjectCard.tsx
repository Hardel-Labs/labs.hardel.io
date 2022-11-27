import Image from 'next/image';
import Harion from '@images/harion.webp';
import InvitationBadge from '@components/badge/Invitation';
import React from 'react';
import { clx, timeSince } from '@libs/utils';
import { ReadablePersonalProjectData } from '@definitions/project';
import { selectProject } from '@libs/request/client/project';

type Props = {
    project: ReadablePersonalProjectData;
};

export default function ProjectCard(props: Props) {
    const handleSelect = async () => await selectProject(props.project.id);

    return (
        <div
            className={clx(
                'bg-black/50 border flex flex-col rounded-xl py-4 px-6 hover:scale-90 transition ease-in-out duration-300 cursor-pointer',
                props.project.isSelected ? 'border-gold' : 'border-zinc-700'
            )}
            onClick={() => handleSelect()}
        >
            <div>
                <div className={'flex justify-between items-center'}>
                    <div className="flex items-center w-fit">
                        <div className="flex-shrink-0">
                            <Image className="rounded-full" width={32} height={32} src={props.project.asset ?? Harion} alt="user photo" />
                        </div>
                        <div className="pl-3">
                            <span className="block text-lg font-semibold text-white">{props.project.name}</span>
                            <span className="block text-sm font-medium break-keep text-gray-500 truncate max-w-[12rem]">Version: {props.project.version}</span>
                        </div>
                    </div>
                    <InvitationBadge />
                </div>
                <hr />
            </div>
            <div className={'flex-auto flex flex-col justify-between'}>
                <p className={'text-sm text-gray-500'}>{props.project.description}</p>
                <div className={'text-sm text-gray-300'}>
                    <span>{timeSince(new Date(props.project?.updatedAt ?? new Date(props.project?.createdAt ?? new Date())))}</span>
                </div>
            </div>
        </div>
    );
}
