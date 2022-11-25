import React from 'react';
import Sidebar from '@main/tools/(Sidebar)/Sidebar';
import ProjectContextProvider from '@main/tools/ProjectContext';

export default async function ToolsLayout({ children }: { children: React.ReactNode }) {
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
