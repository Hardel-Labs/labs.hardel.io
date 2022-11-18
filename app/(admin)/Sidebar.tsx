import Link from 'next/link';
import React from 'react';
import Settings from '@icons/Common/Settings';

function SidebarLink(props: { href: string; title: string; icon: React.ReactNode }) {
    return (
        <Link href={props.href} className={'text-white text-base text-center'}>
            <li className={'cursor-pointer rounded-xl hover:bg-zinc-700 transition-all px-4 py-2 font-semibold hover:font-bold flex items-center gap-x-4'}>
                <div className={'rounded-xl outline outline-gray-700 bg-gradient-to-br from-black to-gray-600 h-8 w-8 flex justify-center items-center'}>
                    <div className={'p-2 fill-white w-full h-full'}>{props.icon}</div>
                </div>

                {props.title}
            </li>
        </Link>
    );
}

function SidebarCategory(props: { children: React.ReactNode; title: string }) {
    return (
        <div className={'w-full'}>
            <p className={'text-white mb-0 text-base font-bold mb-6 px-2'}>{props.title}</p>
            <ul className={'flex flex-col gap-y-3 w-full'}>{props.children}</ul>
            <hr />
        </div>
    );
}

export default function Sidebar() {
    return (
        <div className={'h-screen relative w-[300px] mr-4'}>
            <div className={'w-[inherit] fixed flex flex-col gap-y-4 p-2 h-full'}>
                <div className={'rounded-xl flex flex-col border-gold border p-4 glassmorphism h-full'}>
                    <div>
                        <p className={'text-white text-center mb-0 text-3xl font-semibold'}>Dashboard</p>
                        <hr className={'mb-10'} />
                    </div>
                    <div className={'flex flex-auto flex-col gap-y-4 overflow-y-auto w-full'}>
                        <SidebarCategory title={'Generation :'}>
                            <SidebarLink href={'/'} icon={<Settings />} title={'Home Page'} />
                            <SidebarLink href={'/dashboard'} icon={<Settings />} title={'Dashboard'} />
                            <SidebarLink href={'/dashboard/users'} icon={<Settings />} title={'Users'} />
                        </SidebarCategory>
                        <SidebarCategory title={'Project :'}>
                            <SidebarLink href={'/dashboard/project'} icon={<Settings />} title={'General'} />
                            <SidebarLink href={'/dashboard/project/notification'} icon={<Settings />} title={'Notification'} />
                        </SidebarCategory>
                        <SidebarCategory title={'Crafting :'}>
                            <SidebarLink href={'/dashboard/crafting'} icon={<Settings />} title={'Configuration'} />
                            <SidebarLink href={'/dashboard/crafting/items'} icon={<Settings />} title={'Items'} />
                            <SidebarLink href={'/dashboard/crafting/recipes'} icon={<Settings />} title={'Recipes'} />
                            <SidebarLink href={'/dashboard/crafting/category'} icon={<Settings />} title={'Category'} />
                        </SidebarCategory>
                    </div>
                </div>
            </div>
        </div>
    );
}
