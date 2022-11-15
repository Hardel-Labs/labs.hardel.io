import React from 'react';
import Sidebar from '@app/tools/Sidebar';
import Skew from '@components/Skew';
import HighlightDiamonds from '@components/HighlightDiamonds';
import ProjectContextProvider from '@app/tools/Context';

export default async function ToolsLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProjectContextProvider>
            <div className={'flex bg-grid'}>
                <Sidebar />
                <div className={'w-full'}>
                    <div className={'relative mt-[73px] border-gold border-t z-10 overflow-hidden'}>
                        {children}
                        <Skew />
                        <HighlightDiamonds />
                    </div>
                </div>
            </div>
        </ProjectContextProvider>
    );
}
