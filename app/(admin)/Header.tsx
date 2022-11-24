import Link from 'next/link';
import HardelLetter from '@icons/logo/HardelLetter';
import Image from 'next/image';
import Harion from '@images/harion.webp';
import { Session } from 'next-auth';

type Props = {
    data: Session | null;
};

export default function Header(props: Props) {
    return (
        <nav className={'flex justify-between p-4 m-4'}>
            <div>
                <Link href="/" className="flex items-center fill-white hover:fill-gold">
                    <HardelLetter className="self-center w-10 h-10" />
                    <span className="text-xl font-semibold whitespace-nowrap">ardel</span>
                </Link>
            </div>

            <button type="button" className="w-8 h-8 flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300" id="user-menu-button">
                <span className="sr-only">Open user menu</span>
                <Image className="rounded-full" width={32} height={32} src={props.data?.user?.image ?? Harion} alt="user photo" />
            </button>
        </nav>
    );
}
