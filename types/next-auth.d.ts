import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            roles?: RoleType;
        } & DefaultSession['user'];
        accessToken?: string;
        id: string;
    }

    interface User {
        roles?: RoleType;
    }
}

declare module 'next-auth/jwt' {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        roles: RoleType;
        accessToken?: string;
        id: string;
    }
}
