import Front from '@main/dashboard/settings/members/Front';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@session';
import { redirect } from 'next/navigation';
import { ProjectRole } from '@prisma/client';

export default async function Members() {
    const session = await unstable_getServerSession(authOptions);
    if (!session?.project) redirect('/');
    if (![ProjectRole.OWNER, ProjectRole.ADMIN].some((role) => role === session.project?.role)) {
        redirect('/');
    }

    return <Front />;
}
