import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@libs/prisma';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 60 * 60
    },
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        })
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            if (account?.access_token) {
                token.accessToken = account.access_token;
            }

            if (user?.roles) {
                token.roles = user.roles;
            }

            user && (token.id = user.id);
            return token;
        },
        async session({ session, token }) {
            if (token?.accessToken) {
                session.accessToken = token.accessToken;
            }

            if (token?.roles) {
                session.user.roles = token.roles;
            }

            session.id = token.id;
            return session;
        }
    }
};

export default NextAuth(authOptions);
