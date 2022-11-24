import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@session';

export default async function AuthPage() {
    const session = await unstable_getServerSession(authOptions);

    return (
        <div className={'mt-[73px]'}>
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
    );
}
