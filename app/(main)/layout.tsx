import '@styles/global.scss';
import { Inter } from '@next/font/google';
import Header from '@main/Header';
import Footer from '@main/Footer';
import React from 'react';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@session';
import local from '@next/font/local';

const inter = Inter({
    subsets: ['latin']
});

const seven = local({
    src: [{ path: '../../public/fonts/seven/minecraft.ttf' }, { path: '../../public/fonts/seven/minecraft.woff' }],
    variable: '--font-seven'
});

const minecraft = local({
    src: '../../public/fonts/minecraft.ttf',
    variable: '--font-minecraft'
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await unstable_getServerSession(authOptions);

    return (
        <html lang="en">
            <head>
                <title>Create Next App</title>
            </head>
            <body className={'min-h-screen flex flex-col justify-between background-grid'}>
                <div className={[seven.variable, minecraft.variable, inter.className].join(' ')}>
                    <Header session={session} />
                    <main>{children}</main>
                </div>
                <Footer />
            </body>
        </html>
    );
}
