import { DefaultSession } from 'next-auth';
import { UserData } from '@prisma/client';

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        userData: UserData & DefaultSession['user'];
        accessToken?: string;
        id: string;
    }
}

declare module 'next-auth/jwt' {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        userData?: UserData;
        accessToken?: string;
        id: string;
    }
}
