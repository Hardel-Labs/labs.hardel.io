import { cache } from 'react';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@session';

export const getSession = cache(async () => {
    return await unstable_getServerSession(authOptions);
});

export const preloadSession = () => {
    void getSession();
};
