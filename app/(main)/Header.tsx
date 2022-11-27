'use client';
import Image from 'next/image';
import Harion from '@images/harion.webp';
import { useMemo, useRef, useState } from 'react';
import { Session } from 'next-auth';
import Link from 'next/link';
import { signIn, signOut } from 'next-auth/react';
import RainbowButton from '@components/form/Button/Rainbow';
import HardelLetter from '@icons/logo/HardelLetter';
import Search from '@icons/Common/Search';
import useSWR from 'swr';
import fetcher from '@libs/request/client/fetcher';
import Slash from '@icons/Slash';
import { ReadablePersonalProjectData } from '@definitions/project';
import ArrowBottom from '@icons/Common/ArrowBottom';
import DashboardLink from '@main/DashboardLink';
import UseClickOutside from '@libs/hooks/useClickOutside';
import { clx } from '@libs/utils';

type Props = {
    session: Session | null;
};

export default function Header({ session }: Props) {
    const { data: project, error } = useSWR<ReadablePersonalProjectData>('/api/projects/select', fetcher);
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    UseClickOutside(ref, () => setIsOpen(false));

    const displayedData = useMemo(() => {
        return project ?? session?.project;
    }, [project, session]);

    return (
        <>
            <nav className="bg-black/10 backdrop-blur-sm px-4 py-2.5 min-h-[70px] flex items-center">
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                    <div className={'flex gap-x-2 items-center'}>
                        <Link href="/" className="flex items-center fill-white hover:fill-gold">
                            <HardelLetter className="self-center w-10 h-10" />
                            <span className="text-xl font-semibold whitespace-nowrap">ardel</span>
                        </Link>

                        {session?.userData ? (
                            <>
                                <Slash />
                                {displayedData && (
                                    <>
                                        <Link href={'/'} className={'flex gap-x-2 h-[40px] items-center'}>
                                            <Image className={'h-[40px] w-[40px] rounded-md'} src={displayedData.asset} alt={'Project icon'} width={32} height={32} />
                                            <span className={'text-zinc-300 text-lg font-bold ml-2'}>{displayedData.name}</span>
                                            <ArrowBottom className={'h-[25px] fill-zinc-300 mt-[3px]'} />
                                        </Link>
                                        <Slash />
                                        <div className={'flex gap-x-2'}>
                                            <DashboardLink href={'/dashboard'}>Overview</DashboardLink>
                                            <DashboardLink href={'/dashboard/teams'}>Teams</DashboardLink>
                                            <DashboardLink href={'/dashboard/activity'}>Activity</DashboardLink>
                                            <DashboardLink href={'/dashboard/settings'}>Settings</DashboardLink>
                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            <div className="hidden block ml-8 justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
                                <ul className="apple-system flex flex-col px-4 mt-4 text-white font-semibold md:flex-row md:space-x-4 md:mt-0 md:text-[14px]">
                                    <li>
                                        <Link href="#" className="block py-2 pl-3 text-white md:bg-transparent md:p-0">
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="block py-2 pl-3 text-gray-400 md:hover:bg-transparent md:p-0">
                                            Blog
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="block py-2 pl-3 text-gray-400 md:hover:bg-transparent md:p-0">
                                            Changelog
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="block py-2 pl-3 text-gray-400 md:hover:bg-transparent md:p-0">
                                            Generator
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="block py-2 pl-3 text-gray-400 md:hover:bg-transparent md:p-0">
                                            Donation
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="block py-2 pl-3 text-gray-400 md:hover:bg-transparent md:p-0">
                                            Contact
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center md:order-2">
                        <div className="relative mr-4">
                            <input
                                type="text"
                                className="bg-black text-sm border border-solid border-zinc-700 rounded-xl px-4 py-1 text-white placeholder-gray-400 focus:outline-none focus:border-gold"
                                placeholder="Search a command"
                            />
                            <div className="absolute top-0 right-0 mr-3 h-full flex items-center">
                                <Search className="w-4 h-4 fill-white" />
                            </div>
                        </div>
                        {session?.user ? (
                            <button
                                type="button"
                                className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300"
                                id="user-menu-button"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <span className="sr-only">Open user menu</span>
                                <Image className="rounded-full" width={32} height={32} src={session?.user?.image ?? Harion} alt="user photo" />
                            </button>
                        ) : (
                            <RainbowButton onClick={() => signIn()}>Log in</RainbowButton>
                        )}
                    </div>
                </div>
            </nav>

            {session?.user && (
                <div
                    ref={ref}
                    className={clx('bg-black/70 backdrop-blur-[1rem] absolute top-2 right-2 z-[100] text-base list-none rounded-xl shadow-2xl', isOpen ? 'block' : 'hidden')}
                >
                    <div className="py-3 px-4 w-max">
                        <div className="flex items-center w-fit">
                            <div className="flex-shrink-0">
                                <Image className="rounded-full" width={32} height={32} src={session?.user?.image ?? Harion} alt="user photo" />
                            </div>
                            <div className="pl-3">
                                <span className="block text-sm text-white">{session.user.name}</span>
                                <span className="block text-sm font-medium break-keep text-gray-500 truncate max-w-[12rem]">{session.user.email}</span>
                            </div>
                        </div>
                    </div>
                    <hr className={'border-secondary w-9/12 mx-auto my-3'} />
                    <ul className="py-1">
                        <li className={'w-11/12 mx-auto my-1'}>
                            <Link href="#" className="block w-full text-start py-2 px-4 text-sm text-white hover:bg-secondary/20 hover:text-white  rounded">
                                Profile
                            </Link>
                        </li>
                        <li className={'w-11/12 mx-auto my-1'}>
                            <Link href="#" className="block w-full text-start py-2 px-4 text-sm text-white hover:bg-secondary/20  hover:text-white rounded">
                                Settings
                            </Link>
                        </li>
                        <li className={'w-11/12 mx-auto my-1'}>
                            <button onClick={() => signOut()} className="block w-full text-start py-2 px-4 text-sm text-white hover:bg-secondary/20 hover:text-white rounded">
                                Sign out
                            </button>
                        </li>
                        {session.userData.roles === 'ADMIN' && (
                            <>
                                <hr className={'border-gray-600 w-9/12 mx-auto my-3'} />
                                <li className={'w-11/12 mx-auto my-1'}>
                                    <Link href={'/admin/dashboard'} className="block w-full text-start py-2 px-4 text-sm text-white hover:bg-secondary/20 hover:text-white rounded">
                                        Dashboard
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </>
    );
}
