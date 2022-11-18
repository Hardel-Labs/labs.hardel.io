import React from 'react';
import Sidebar from '@main/tools/Sidebar';
import Skew from '@components/Skew';
import HighlightDiamonds from '@components/HighlightDiamonds';
import ProjectContextProvider from '@main/tools/Context';

export default async function ToolsLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProjectContextProvider>
            <div className={'background-grid relative z-10'}>
                <div className={'flex'}>
                    <Sidebar />
                    <div className={'w-full relative overflow-hidden'}>
                        <div className={'relative mt-[73px] border-gold border-t z-20'}>{children}</div>
                        <Skew />
                    </div>
                </div>
                <HighlightDiamonds />
            </div>
        </ProjectContextProvider>
    );
}
