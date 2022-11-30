import Front from '@main/dashboard/settings/advanced/Front';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@session';
import { redirect } from 'next/navigation';
import { ProjectRole } from '@prisma/client';

export default async function Advanced() {
    const session = await unstable_getServerSession(authOptions);
    if (!session?.project) redirect('/');
    if (session.project.role !== ProjectRole.OWNER) redirect('/');

    return (
        <div className={'flex flex-col gap-y-8'}>
            <Front />
        </div>
    );
}
