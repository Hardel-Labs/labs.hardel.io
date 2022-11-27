import { UserData } from '@prisma/client';
import { ReadablePersonalProjectData } from '@definitions/project';

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        project: ReadablePersonalProjectData | null;
        userData: UserData;
        accessToken?: string;
        id: string;
    }
}

declare module 'next-auth/jwt' {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        project: ReadablePersonalProjectData | null;
        userData?: UserData;
        accessToken?: string;
        id: string;
    }
}
