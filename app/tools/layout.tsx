import React from 'react';
import Sidebar from '@app/tools/Sidebar';

export default async function ToolsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={'flex'}>
            <Sidebar />
            <div className={'mt-[73px] w-full relative z-40'}>{children}</div>
        </div>
    );
}
