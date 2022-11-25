import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
        const token = await getToken({ req, secret: process.env.SECRET });
        if (!token) {
            return NextResponse.redirect('/api/auth/signin');
        }

        if (token.userData?.roles !== 'ADMIN') {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }
}

export const config = {
    matcher: '/dashboard/admin/:path*'
};
