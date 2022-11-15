import React from 'react';
import Sidebar from '@app/tools/Sidebar';
import Skew from '@components/Skew';
import HighlightDiamonds from '@components/HighlightDiamonds';
import ProjectContextProvider from '@app/tools/Context';

export default async function ToolsLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProjectContextProvider>
            <div className={'background-grid relative overflow-hidden z-10'}>
                <div className={'flex'}>
                    <Sidebar />
                    <div className={'w-full'}>
                        <div className={'relative mt-[73px] border-gold border-t z-20'}>{children}</div>
                    </div>
                </div>

                <Skew />
                <HighlightDiamonds />
            </div>
        </ProjectContextProvider>
    );
}
