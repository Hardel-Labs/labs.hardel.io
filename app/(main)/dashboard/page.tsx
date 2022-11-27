import React from 'react';
import ProjectManager from '@main/dashboard/ProjectManager';
import Slash from '@icons/Slash';

export default function Dashboard() {
    return (
        <section className={'min-height-view flex flex-col border-b-gold border-b-8 border-solid'}>
            <div className={'py-10 px-[150px] w-full'}>
                <div className={'flex gap-x-4'}>
                    <h1 className={'text-4xl font-bold text-gold'}>Dashboard</h1>
                    <Slash />
                    <span className={'text-4xl font-bold text-zinc-200'}>Your projects</span>
                </div>
                <hr className={'mb-8'} />
                <ProjectManager />
            </div>
        </section>
    );
}
