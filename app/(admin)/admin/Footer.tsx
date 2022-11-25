import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="w-full p-10 text-sm text-white">
            <div className="flex items-center justify-end">
                <div>
                    © {new Date().getFullYear()}
                    {' - '}
                    <Link className="font-semibold" href={'/dashboard'}>
                        Hardel.io
                    </Link>
                </div>
            </div>
        </footer>
    );
}
