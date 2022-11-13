'use client';

import React, { useCallback, useEffect } from 'react';
import Image from 'next/image';
import HarionLogo from '@images/Harion.png';
import Settings from '@icons/Common/Settings';
import Notifications from '@icons/Common/Notifications';
import Download from '@icons/Download';
import Menu from '@icons/Menu';
import SidebarNotifications from '@app/tools/SidebarNotification';
import SidebarSettings from '@app/tools/SidebarSettings';
import SidebarProject from '@app/tools/SidebarProject';

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
                setComponent(undefined);
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
        <>
            <div className={'mt-[73px] relative sticky top-0 left-0 h-screen bg-gray-900/50 flex'}>
                <div className={'h-full flex flex-col justify-between w-16 relative z-50 border-r border-gold border-solid'}>
                    <div className={'flex flex-col gap-y-4 items-center p-4 overflow-y-auto'}>
                        <Menu className={'w-full h-auto fill-gray-600 hover:fill-white transition cursor-pointer'} />
                        <Download className={'w-full h-auto fill-gray-600 hover:fill-white transition cursor-pointer'} />
                    </div>
                    <div className={'flex flex-col gap-y-8 items-center p-4'}>
                        <div onClick={() => openMenu('project')}>
                            <Image src={HarionLogo} alt={'Logo Project'} className={'rounded-2xl opacity-50 hover:opacity-100 transition cursor-pointer'} width={50} height={50} />
                        </div>
                    </div>
                    <div className={'flex flex-col gap-y-8 items-center p-4'}>
                        <Notifications className={'w-full h-auto fill-gray-600 hover:fill-white transition cursor-pointer'} onClick={() => openMenu('notification')} />
                        <Settings className={'w-full h-auto fill-gray-600 hover:fill-white transition cursor-pointer'} onClick={() => openMenu('settings')} />
                    </div>
                </div>
                <div
                    className={'h-full bg-black/30 backdrop-blur-xl overflow-hidden transition-[width] ease-out duration-200 absolute z-50 left-16'}
                    style={activeMenu ? { width: width } : { width: 0 }}
                >
                    <div ref={refSidebar} className={'flex flex-col items-center h-full p-4 w-max'}>
                        {component}
                    </div>
                </div>
            </div>
        </>
    );
}
