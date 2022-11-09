export default function Home() {
    return (
        <div className={'flex justify-center h-screen items-center'}>
            <div className={'text-center'}>
                <h1 className={'font-bold text-3xl'}>Start your next project with </h1>
                <p className={'text-xl mt-4'}>
                    <a className={'text-blue-500 hover:text-blue-700'} href={'https://nextjs.org/docs'}>
                        Next.js 13
                    </a>
                </p>

                <p className={'text-xl mt-4'}>
                    <a className={'text-blue-500 hover:text-blue-700'} href={'https://tailwindcss.com/docs'}>
                        Tailwind CSS and SCSS
                    </a>
                </p>

                <p className={'text-xl mt-4'}>
                    <a className={'text-blue-500 hover:text-blue-700'} href={'https://www.typescriptlang.org/docs'}>
                        TypeScript
                    </a>
                </p>

                <p className={'text-xl mt-4'}>
                    <a className={'text-blue-500 hover:text-blue-700'} href={'https://eslint.org/docs/user-guide/getting-started'}>
                        ESLint
                    </a>
                </p>

                <p className={'text-xl mt-4'}>
                    <a className={'text-blue-500 hover:text-blue-700'} href={'https://prettier.io/docs/en/index.html'}>
                        Prettier
                    </a>
                </p>
            </div>
        </div>
    );
}
