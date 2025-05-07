// 'use client';

// import { useRouter, usePathname } from 'next/navigation';
// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';

// const PublicRoute = ({ children }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { isAuthenticated, loading: authLoading } = useSelector((state) => state.auth);

//   console.log(pathname, "currentPath")

//   const publicPages = ['/signIn', '/signUp', '/forgotPassword', '/resetPassword'];

//   useEffect(() => {
//     if (!authLoading && isAuthenticated && publicPages.includes(pathname)) {
//       router.replace('/');
//     }
//   }, [authLoading, isAuthenticated, pathname, router]);

//   if (authLoading) return null;

//   if (!isAuthenticated && publicPages.includes(pathname)) {
//     return children;
//   }

//   return null;
// };

// export default PublicRoute;


'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isTempPass, loading: authLoading } = useSelector((state) => state.auth);

  const publicPages = ['/signIn', '/signUp', '/forgotPassword', '/resetPassword'];
  const isPublicPage = publicPages.includes(pathname);

  useEffect(() => {
    if (authLoading) return;

    // ✅ If trying to access /setPermanentPassword
    if (pathname === '/setPermanentPassword') {
      if (!isAuthenticated || !isTempPass) {
        router.replace('/signIn');
      }
      return;
    }

    // ✅ Redirect authenticated users away from public pages
    if (isAuthenticated && isPublicPage) {
      router.replace('/');
    }
  }, [authLoading, isAuthenticated, isTempPass, pathname, router]);

  if (authLoading) return null;

  // ✅ Allow unauthenticated users to access public pages
  if (!isAuthenticated && isPublicPage) {
    return children;
  }

  // ✅ Allow authenticated temp users to access only /setPermanentPassword
  if (isAuthenticated && isTempPass && pathname === '/setPermanentPassword') {
    return children;
  }

  return null;
};

export default PublicRoute;



