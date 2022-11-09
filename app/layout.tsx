import '@styles/globals.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <title>Create Next App</title>
            </head>
            <body>
                <main>{children}</main>
            </body>
        </html>
    );
}
