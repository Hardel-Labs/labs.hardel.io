'use client';
import Image from 'next/image';
import Harion from '@images/Harion.png';
import { useState } from 'react';
import { Session } from 'next-auth';
import Link from 'next/link';
import { signIn, signOut } from 'next-auth/react';
import RainbowButton from '@components/form/Rainbow';
import HardelLetter from '@icons/logo/HardelLetter';
import Search from '@icons/Common/Search';

type Props = {
    session: Session | null;
};

export default function Header({ session }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(true);

    return (
        <nav className="bg-black/10 backdrop-blur-sm sticky relative z-40 px-4 py-2.5">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <div className={'flex'}>
                    <Link href="/" className="flex items-center fill-white hover:fill-gold">
                        <HardelLetter className="self-center w-10 h-10" />
                        <span className="text-xl font-semibold whitespace-nowrap">ardel</span>
                    </Link>

                    <div aria-expanded={collapsed} className="hidden aria-expanded:block ml-8 justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
                        <ul className="apple-system flex flex-col p-4 mt-4 text-white font-semibold md:flex-row md:space-x-4 md:mt-0 md:text-[14px]">
                            <li>
                                <a href="#" className="block py-2 pl-3 text-white md:bg-transparent md:p-0" aria-current="page">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pl-3 text-gray-400 md:hover:bg-transparent md:p-0">
                                    Changelog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pl-3 text-gray-400 md:hover:bg-transparent md:p-0">
                                    Generator
                                </a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pl-3 text-gray-400 md:hover:bg-transparent md:p-0">
                                    Donation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pl-3 text-gray-400 md:hover:bg-transparent md:p-0">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex items-center md:order-2 relative">
                    <div className="relative mr-4">
                        <input
                            type="text"
                            className="bg-black text-sm border-2 border-solid border-gray-800 rounded-xl px-4 py-1 text-white placeholder-gray-400 focus:outline-none focus:border-gold"
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
                            aria-expanded={isOpen}
                            data-dropdown-toggle="user-dropdown"
                            data-dropdown-placement="bottom"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span className="sr-only">Open user menu</span>
                            <Image className="rounded-full" width={32} height={32} src={session?.user?.image ?? Harion} alt="user photo" />
                        </button>
                    ) : (
                        <RainbowButton onClick={() => signIn()}>Log in</RainbowButton>
                    )}
                    {session?.user && (
                        <div
                            aria-expanded={isOpen}
                            className="hidden aria-expanded:block bg-black/70 backdrop-blur-[1rem] absolute -top-2 -right-0 z-[100] text-base list-none rounded-xl shadow-2xl"
                            id="user-dropdown"
                            data-popper-reference-hidden=""
                            data-popper-escaped=""
                            data-popper-placement="bottom"
                        >
                            <div className="py-3 px-4 w-max" onClick={() => setIsOpen(!isOpen)}>
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
                            <ul className="py-1" aria-labelledby="user-menu-button">
                                <li className={'w-11/12 mx-auto my-1'}>
                                    <a href="#" className="block w-full text-start py-2 px-4 text-sm text-white hover:bg-secondary/20 hover:text-white  rounded">
                                        Dashboard
                                    </a>
                                </li>
                                <li className={'w-11/12 mx-auto my-1'}>
                                    <a href="#" className="block w-full text-start py-2 px-4 text-sm text-white hover:bg-secondary/20  hover:text-white  rounded">
                                        Settings
                                    </a>
                                </li>
                                <li className={'w-11/12 mx-auto my-1'}>
                                    <a href="#" className="block w-full text-start py-2 px-4 text-sm text-white hover:bg-secondary/20 hover:text-white rounded">
                                        Earnings
                                    </a>
                                </li>
                                <li className={'w-11/12 mx-auto my-1'}>
                                    <button
                                        onClick={() => signOut()}
                                        className="block w-full text-start py-2 px-4 text-sm text-white hover:bg-secondary/20 hover:text-white  rounded"
                                    >
                                        Sign out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                    <button
                        data-collapse-toggle="mobile-menu-2"
                        type="button"
                        className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        aria-controls="mobile-menu-2"
                        aria-expanded={collapsed}
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
}
