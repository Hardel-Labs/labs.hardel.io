import React from 'react';
import Front from '@main/dashboard/settings/Front';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@session';
import { redirect } from 'next/navigation';

export default async function Settings() {
    const session = await unstable_getServerSession(authOptions);
    if (!session?.project) redirect('/');

    return <Front />;
}
