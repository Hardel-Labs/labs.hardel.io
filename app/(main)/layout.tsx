import '@styles/main.scss';
import '@styles/tailwind.css';
import { Inter } from '@next/font/google';
import Header from '@main/Header';
import Footer from '@main/Footer';
import React from 'react';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@session';

const inter = Inter({
    subsets: ['latin']
});
export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await unstable_getServerSession(authOptions);

    return (
        <html lang="en" className={inter.className}>
            <head>
                <title>Create Next App</title>
            </head>
            <body>
                <div>
                    <Header session={session} />
                    <main className={'-mt-[73px] relative'}>{children}</main>
                </div>
                <Footer />
            </body>
        </html>
    );
}
