import React from 'react';
import Sidebar from '@main/tools/Sidebar';
import ProjectContextProvider from '@main/tools/ProjectContext';

export default async function ToolsLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProjectContextProvider>
            <div className={'background-grid relative'}>
                <div className={'flex'}>
                    <Sidebar />
                    <div className={'w-full relative overflow-hidden'}>
                        <div className={'mt-[73px] border-gold border-t'}>{children}</div>
                    </div>
                </div>
            </div>
        </ProjectContextProvider>
    );
}
