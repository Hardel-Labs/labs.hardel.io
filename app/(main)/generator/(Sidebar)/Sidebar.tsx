'use client';

import React, { useCallback, useEffect } from 'react';
import Settings from '@icons/Common/Settings';
import Notifications from '@icons/Common/Notifications';
import Download from '@icons/Common/Download';
import SidebarNotifications from '@main/generator/(Sidebar)/SidebarNotification';
import SidebarSettings from '@main/generator/(Sidebar)/SidebarSettings';
import SidebarProject from '@main/generator/(Sidebar)/SidebarProject';
import Members from '@icons/Common/Members';

const optionsMenu = [
    { menu: 'settings', component: <SidebarSettings /> },
    { menu: 'notification', component: <SidebarNotifications /> },
    { menu: 'project', component: <SidebarProject /> }
];

export default function Sidebar() {
    const [activeMenu, setActiveMenu] = React.useState<string>();
    const [width, setWidth] = React.useState<number>(0);
    const [component, setComponent] = React.useState<React.ReactNode>();
    const refSidebar = React.useRef<HTMLDivElement>(null);

    const openMenu = useCallback(
        (menu?: string) => {
            if (menu === activeMenu) {
                setActiveMenu(undefined);
                setTimeout(() => setComponent(undefined), 300);
                setWidth(0);
                return;
            }

            const option = optionsMenu.find((option) => option.menu === menu);
            setActiveMenu(menu);
            setComponent(option?.component);
        },
        [activeMenu]
    );

    useEffect(() => {
        setWidth(refSidebar.current?.clientWidth ?? 0);
    }, [component]);

    return (
        <div className={'relative z-50'}>
            <div className={'sticky top-0 left-0 h-screen bg-black/10 backdrop-blur-sm flex'}>
                <div className={'h-full flex flex-col justify-between p-4 w-16 border-r border-gold border-solid'}>
                    <div className={'flex flex-col gap-y-8'}>
                        <Download className={'w-full h-auto fill-gray-600 hover:fill-white transition cursor-pointer'} />
                        <Notifications className={'w-full h-auto fill-gray-600 hover:fill-white transition cursor-pointer'} onClick={() => openMenu('notification')} />
                        <Members className={'w-full h-auto fill-gray-600 hover:fill-white transition cursor-pointer'} onClick={() => openMenu('project')} />
                    </div>
                    <div className={'flex flex-col gap-y-8'}>
                        <Settings className={'w-full h-auto fill-gray-600 hover:fill-white transition cursor-pointer'} onClick={() => openMenu('settings')} />
                    </div>
                </div>
                <div className={'h-full overflow-hidden transition-[width] ease-out duration-200 absolute z-50 left-16'} style={activeMenu ? { width: width } : { width: 0 }}>
                    <div ref={refSidebar} className={'flex flex-col items-center h-full p-4 w-max bg-black/80'}>
                        {component}
                    </div>
                </div>
            </div>
        </div>
    );
}
