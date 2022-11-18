import Link from 'next/link';

export default function Footer() {
    return (
        <footer className={'bg-primary text-secondary border-t-8 border-solid border-t-gold text-[15px] leading-6 pt-16 pb-5'}>
            <div className={'container mx-auto px-8 lg:px-48'}>
                <div className={'sm:grid sm:grid-cols-2 md:grid-cols-4 gap-8'}>
                    <div className={'col-span-2 mt-8'}>
                        <h3 className={'text-base font-bold text-white tracking-widest'}>A PROPOS</h3>
                        <p className={'mt-2 text-justify'}>
                            Hardel.fr est un site ou vous pourrez retrouvez, différents guides et cours pour débutant ou expert, pour apprendre à développer des contenus dans
                            l&lsquo;univers de Minecraft en Français. Vous trouverez aussi de très bons data packs, des ressource pack, mods ou autres, ou encore de nouvelles
                            techniques de développement qui se découvrent chaque jour, mais aussi des générateurs pour aider n&lsquo;importe qui a développer rapidement sans
                            connaissance.
                        </p>
                    </div>
                    <div className={'col-span-1 mt-8'}>
                        <h3 className={'text-base font-bold text-white tracking-widest'}>PAGES RACCOURCIE</h3>
                        <ul className={'list-inside mt-2 font-light'}>
                            <li>
                                <Link href="/">Page d&lsquo;accueil</Link>
                            </li>
                            <li>
                                <Link href="/">Page de contact</Link>
                            </li>
                            <li>
                                <Link href="/">Page de connexion</Link>
                            </li>
                            <li>
                                <Link href="/">Page de profil</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={'col-span-1 mt-8'}>
                        <h3 className={'text-base font-bold text-white tracking-widest'}>CONTACT & DIVERS</h3>
                        <ul className={'list-inside mt-2 font-light'}>
                            <li>
                                <Link href="/">Discord</Link>
                            </li>
                            <li>
                                <Link href="/">Twitter</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr className={'border-secondary my-8'} />
                <div className={'flex justify-between items-center'}>
                    <div className={'flex items-center'}>
                        <p className={'ml-2 text-sm font-light'}>© {new Date().getFullYear()} Hardel.io - Créer avec ❤️ par Hardel </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
