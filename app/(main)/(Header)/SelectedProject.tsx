'use client';
import { Session } from 'next-auth';
import Slash from '@icons/Slash';
import Image from 'next/image';
import DefaultProject from '@images/design/item_placeholder.webp';
import ArrowBottom from '@icons/Common/ArrowBottom';
import DashboardLink from '@main/(Header)/DashboardLink';
import useSWR from 'swr';
import { ReadablePersonalProjectData } from '@definitions/project';
import fetcher from '@libs/request/client/fetcher';
import { useMemo, useRef, useState } from 'react';
import UseClickOutside from '@libs/hooks/useClickOutside';
import { clx } from '@libs/utils';
import ProjectDropdownItem from '@main/(Header)/ProjectDropdownItem';
import FormInput from '@components/form/input';

type Props = {
    session: Session | null;
};

export default function SelectedProject({ session }: Props) {
    const { data: project } = useSWR<ReadablePersonalProjectData[]>('/api/projects', fetcher);
    const ref = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    UseClickOutside(ref, () => setIsOpen(false));

    const selectedProject = useMemo(() => {
        return project?.find((project) => project.isSelected) ?? session?.project;
    }, [project, session?.project]);

    const displayedProject = useMemo(() => {
        return (
            project
                ?.filter((project) => project.id !== selectedProject?.id)
                .filter((project) => project.name.toLowerCase().includes(search.toLowerCase()))
                .slice(0, 5) ?? []
        );
    }, [project, search, selectedProject?.id]);

    return (
        <>
            <Slash />
            <div className={'flex gap-x-2 h-[40px] items-center cursor-pointer'} onClick={() => setIsOpen(true)}>
                <Image className={'h-[40px] w-[40px] rounded-md'} src={selectedProject?.asset ?? DefaultProject} alt={'Project icon'} width={32} height={32} />
                <span className={'text-zinc-300 text-lg font-bold ml-2'}>{selectedProject?.name ?? 'No project selected'}</span>
                <ArrowBottom className={'h-[25px] fill-zinc-300 mt-[3px]'} />
            </div>
            <Slash />
            <div className={'flex gap-x-2'}>
                <DashboardLink href={'/dashboard'}>Overview</DashboardLink>
                {selectedProject?.id && (
                    <>
                        <DashboardLink href={'/dashboard/teams'}>Teams</DashboardLink>
                        <DashboardLink href={'/dashboard/activity'}>Activity</DashboardLink>
                        <DashboardLink href={'/dashboard/settings'}>Settings</DashboardLink>
                    </>
                )}
            </div>

            {isOpen && (
                <div ref={ref} className={clx('bg-black/90 absolute top-[72px] left-[120px] z-[100] text-base list-none rounded-xl', isOpen ? 'block' : 'hidden')}>
                    <div className={'p-4'}>
                        <FormInput placeholder={'Search for a project'} value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    {selectedProject && <ProjectDropdownItem project={selectedProject} />}
                    <hr className={'my-1'} />
                    {displayedProject.length > 0 &&
                        displayedProject.map((project) => {
                            return <ProjectDropdownItem key={project.id} project={project} />;
                        })}
                </div>
            )}
        </>
    );
}
