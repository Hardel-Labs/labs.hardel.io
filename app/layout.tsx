import '@styles/globals.scss';
import Header from '@app/Header';
import Footer from '@app/Footer';
import React from 'react';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@session';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await unstable_getServerSession(authOptions);

    return (
        <html lang="en">
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
