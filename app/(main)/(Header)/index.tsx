import Link from 'next/link';
import { signIn } from 'next-auth/react';
import RainbowButton from '@components/form/Button/Rainbow';
import HardelLetter from '@icons/logo/HardelLetter';
import Search from '@icons/Common/Search';
import UserDropdown from '@main/(Header)/UserDropdown';
import SelectedProject from '@main/(Header)/SelectedProject';
import { Session } from 'next-auth';

type Props = {
    session: Session | null;
};

export default function Header({ session }: Props) {
    return (
        <>
            <nav className="bg-black/10 relative z-20 backdrop-blur-sm px-4 py-2.5 min-h-[70px] flex items-center">
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                    <div className={'flex gap-x-2 items-center'}>
                        <Link href={'/'} className="flex items-center fill-white hover:fill-gold">
                            <HardelLetter className="self-center w-10 h-10" />
                            <span className="text-xl font-semibold whitespace-nowrap">ardel</span>
                        </Link>

                        {session?.userData ? (
                            <SelectedProject session={session} />
                        ) : (
                            <div className="hidden block ml-8 justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
                                <ul className="apple-system flex flex-col px-4 mt-4 text-white font-semibold md:flex-row md:space-x-4 md:mt-0 md:text-[14px]">
                                    <li>
                                        <Link href={'/'} className="block py-2 pl-3 text-white md:bg-transparent md:p-0">
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={'/'} className="block py-2 pl-3 text-gray-400 md:hover:bg-transparent md:p-0">
                                            Blog
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={'/'} className="block py-2 pl-3 text-gray-400 md:hover:bg-transparent md:p-0">
                                            Changelog
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={'/generator'} className="block py-2 pl-3 text-gray-400 md:hover:bg-transparent md:p-0">
                                            Generator
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={'/'} className="block py-2 pl-3 text-gray-400 md:hover:bg-transparent md:p-0">
                                            Donation
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={'/'} className="block py-2 pl-3 text-gray-400 md:hover:bg-transparent md:p-0">
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
                        {session?.user ? <UserDropdown session={session} /> : <RainbowButton onClick={() => signIn()}>Log in</RainbowButton>}
                    </div>
                </div>
            </nav>
        </>
    );
}
