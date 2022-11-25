import React from 'react';
import ProjectManager from '@main/dashboard/ProjectManager';

export default function Dashboard() {
    return (
        <section className={'min-height-view flex flex-col border-b-gold border-b-8 border-solid'}>
            <div className={'py-10 px-[150px] w-full'}>
                <ProjectManager />
            </div>
        </section>
    );
}
