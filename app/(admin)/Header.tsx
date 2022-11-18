import Link from 'next/link';
import HardelLetter from '@icons/logo/HardelLetter';
import Image from 'next/image';
import Harion from '@images/Harion.png';

export default function Header() {
    return (
        <nav className={'flex justify-between p-4 m-4'}>
            <div>
                <Link href="/" className="flex items-center fill-white hover:fill-gold">
                    <HardelLetter className="self-center w-10 h-10" />
                    <span className="text-xl font-semibold whitespace-nowrap">ardel</span>
                </Link>
            </div>

            <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300" id="user-menu-button">
                <span className="sr-only">Open user menu</span>
                <Image className="rounded-full" width={32} height={32} src={Harion} alt="user photo" />
            </button>
        </nav>
    );
}
