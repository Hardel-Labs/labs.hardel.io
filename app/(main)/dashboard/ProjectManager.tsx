'use client';

import React from 'react';
import FormInput from '@components/form/input';
import WhiteButton from '@components/form/Button/White';
import ProjectCard from '@main/dashboard/ProjectCard';
import Drawer from '@components/drawer';
import CreateProject from '@components/drawer/container/CreateProject';
import useSWR from 'swr';
import fetcher from '@libs/request/client/fetcher';
import HardelLoader from '@components/loader/HardelLoader';
import { ReadablePersonalProjectData } from '@definitions/project';

export default function ProjectManager() {
    const { data, error } = useSWR<ReadablePersonalProjectData[]>('/api/projects', fetcher);
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');

    const display = data?.filter((project) => project.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <div className={'flex mb-8'}>
                <div className={'flex flex-auto'}>
                    <FormInput type={'text'} placeholder="Search a project" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className={'flex'}>
                    <WhiteButton onClick={() => setOpen(true)} className={'ml-4'}>
                        New project
                    </WhiteButton>
                </div>
            </div>
            {data && (
                <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>
                    {display?.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}

            {!data && (
                <div className={'h-[300px] py-20 w-full flex justify-center items-center'}>
                    <HardelLoader />
                </div>
            )}

            {error && (
                <div className={'flex justify-center'}>
                    <p className={'text-red-400'}>An error occurred</p>
                </div>
            )}

            <Drawer title={'Create a new project'} description={'Create a new project to start your adventure on hardel.io'} onClose={() => setOpen(false)} isOpened={open}>
                <CreateProject onClose={() => setOpen(false)} />
            </Drawer>
        </>
    );
}
