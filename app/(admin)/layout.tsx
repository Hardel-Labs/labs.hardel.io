import '@styles/dashboard.scss';
import '@styles/tailwind.css';
import { Inter } from '@next/font/google';
import React from 'react';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@session';
import Sidebar from '@admin/Sidebar';
import Footer from '@admin/Footer';
import Header from '@admin/Header';

const inter = Inter({
    subsets: ['latin']
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await unstable_getServerSession(authOptions);

    return (
        <html lang="en">
            <head>
                <title>Dashboard</title>
            </head>
            <body>
                <main className={inter.className}>
                    <div className={'flex background-grid'}>
                        <Sidebar />
                        <div className={'flex flex-auto flex-col justify-between min-h-screen'}>
                            <div className={'relative'}>
                                <Header data={session} />
                                <div>{children}</div>
                            </div>
                            <Footer />
                        </div>
                    </div>
                </main>
            </body>
        </html>
    );
}
