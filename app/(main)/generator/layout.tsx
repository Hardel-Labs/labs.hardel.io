import React from 'react';
import Sidebar from '@main/generator/(Sidebar)/Sidebar';
import ProjectContextProvider from '@main/generator/ProjectContext';

export default async function GeneratorLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProjectContextProvider>
            <div className={'flex relative'}>
                <Sidebar />
                <div className={'w-full relative overflow-hidden'}>
                    <div className={'border-gold border-t'}>{children}</div>
                </div>
            </div>
        </ProjectContextProvider>
    );
}
