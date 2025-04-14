// 'use client';

// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';

// const PrivateRoute = ({ children }) => {
//   const router = useRouter();
//   const { isAuthenticated, loading: authLoading, isTempPass } = useSelector(state => state.auth);
//   const [routeChanging, setRouteChanging] = useState(false);
//   const [loadingMessage, setLoadingMessage] = useState('Loading your content...');
//   const [currentPath, setCurrentPath] = useState('');

//   useEffect(() => {
//     // Set current path on client side
//     if (typeof window !== 'undefined') {
//       setCurrentPath(window.location.pathname);
//     }
//   }, []);

//   // Handle authentication and temporary password redirects
//   useEffect(() => {
//     if (authLoading) return;

//     // If user is not authenticated, redirect to login
//     if (isAuthenticated === false) {
//       setLoadingMessage('Redirecting to login...');
//       router.replace('/signIn');
//     }
//     // If user is trying to access setPermanentPassword without temp pass, redirect
//     else if (isAuthenticated === true && 
//              currentPath.includes('setPermanentPassword') && 
//              !isTempPass) {
//       setLoadingMessage('Redirecting to home...');
//       router.replace('/');
//     }
//   }, [isAuthenticated, authLoading, router, currentPath, isTempPass]);

//   // Handle route change events for loading state
//   useEffect(() => {
//     const handleRouteChangeStart = (url) => {
//       setRouteChanging(true);
//       if (url.includes('signIn')) {
//         setLoadingMessage('Redirecting to login...');
//       } else if (url.includes('setPermanentPassword')) {
//         setLoadingMessage('Checking temporary password status...');
//       } else {
//         setLoadingMessage('Loading your content...');
//       }
//     };

//     const handleRouteChangeComplete = () => setRouteChanging(false);
//     const handleRouteChangeError = () => {
//       setLoadingMessage('Something went wrong. Please wait...');
//       setTimeout(() => setRouteChanging(false), 2000);
//     };

//     window.addEventListener('routeChangeStart', handleRouteChangeStart);
//     window.addEventListener('routeChangeComplete', handleRouteChangeComplete);
//     window.addEventListener('routeChangeError', handleRouteChangeError);

//     return () => {
//       window.removeEventListener('routeChangeStart', handleRouteChangeStart);
//       window.removeEventListener('routeChangeComplete', handleRouteChangeComplete);
//       window.removeEventListener('routeChangeError', handleRouteChangeError);
//     };
//   }, []);

//   // Show loading spinner for either auth check or route change
//   if (authLoading || routeChanging) {
//     return (
//       <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50 space-y-6">
//         <div className="relative w-24 h-24">
//           <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
//           <div className="absolute inset-0 border-4 border-t-[#8B2433] rounded-full animate-spin"></div>
//         </div>

//         <div className="text-center max-w-md px-4">
//           <h3 className="text-xl font-medium text-gray-800 mb-2">Please wait</h3>
//           <p className="text-gray-600">{loadingMessage}</p>

//           <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
//             <div
//               className="bg-[#8B2433] h-2 rounded-full animate-pulse"
//               style={{ width: '70%' }}
//             ></div>
//           </div>

//           <p className="mt-4 text-sm text-gray-500 italic">
//             Did you know? {randomFact()}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return children;
// };

// function randomFact() {
//   const facts = [
//     "Our platform processes requests in under 500ms on average.",
//     "You can use keyboard shortcuts to navigate faster.",
//     "Over 90% of users find what they need within 3 clicks.",
//     "We refresh your data every 30 seconds automatically."
//   ];
//   return facts[Math.floor(Math.random() * facts.length)];
// }

// export default PrivateRoute;

'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, loading: authLoading } = useSelector(state => state.auth);
  
  // BLOCK ALL RENDERING until we know auth status
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      // Use replace with callback to ensure redirect happens before any render
      router.replace('/signIn', {
        callback: () => {
          // This ensures the redirect completes before any state update
          window.requestAnimationFrame(() => {
            setShouldRender(false);
          });
        }
      });
    } else {
      setShouldRender(true);
    }
  }, [isAuthenticated, authLoading, router]);

  // COMPLETELY BLOCK rendering until auth is confirmed
  if (!shouldRender) {
    return null; // Render absolutely nothing
  }

  return children;
};

export default PrivateRoute;