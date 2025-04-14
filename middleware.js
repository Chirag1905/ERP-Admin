// middleware/auth.js
import { store } from '@/Redux/store'
import { NextResponse } from 'next/server'

export function middleware(request) {
    const state = store.getState()
    const { isAuthenticated } = state.auth
    const { pathname } = request.nextUrl

    // Routes that don't require authentication
    const publicRoutes = ['/login', '/register', '/forgot-password']

    // Auth layout routes (special cases)
    const authLayoutRoutes = ['/set-permanent-password']

    // If trying to access protected route without authentication
    if (!isAuthenticated && !publicRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Special case for set-permanent-password in auth layout
    if (pathname.startsWith('/set-permanent-password') && !isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}