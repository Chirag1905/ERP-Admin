// // middleware.js
// import { NextResponse } from 'next/server';
// import { useSelector } from 'react-redux';

// export async function middleware(request) {
//   const { loginData, isAuthenticated, loading: authLoading, error, token, isTempPass } = useSelector(state => state.auth);

//   // Include '/' in protected routes
//   const protectedRoutes = ['/', '/dashboard', '/profile'];
//   const authRoutes = ['/signin', '/signup'];

//   if (!isAuthenticated && protectedRoutes.some(route => 
//     request.nextUrl.pathname === route
//   )) {
//     const signInUrl = new URL('/signin', request.url);
//     signInUrl.searchParams.set('from', request.nextUrl.pathname);
//     return NextResponse.redirect(signInUrl);
//   }

//   return NextResponse.next();
// }