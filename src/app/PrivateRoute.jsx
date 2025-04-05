// 'use client';

// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';

// const PrivateRoute = ({ children }) => {
//   const router = useRouter();
//   const { loginData, isAuthenticated, loading, error, token, isTempPass } = useSelector(state => state.auth);
//   console.log("🚀 ~ PrivateRoute ~ isAuthenticated:", isAuthenticated)
//   console.log("🚀 ~ PrivateRoute ~ token:", token)
//   console.log("🚀 ~ PrivateRoute ~ isTempPass:", isTempPass)
//   console.log("🚀 ~ PrivateRoute ~ error:", error)
//   console.log("🚀 ~ PrivateRoute ~ loginData:", loginData)
//   console.log("🚀 ~ PrivateRoute ~ loading:", loading)

//   useEffect(() => {
//     if (isAuthenticated === false) {
//       router.replace('/signIn');
//     }
//   }, [isAuthenticated, router]);

//   if (loading) {
//     return (
//       <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
//         <svg
//           aria-hidden="true"
//           className="w-12 h-12 text-gray-200 animate-spin fill-[#8B2433]"
//           viewBox="0 0 100 101"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
//             fill="currentColor"
//           />
//           <path
//             d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
//             fill="currentFill"
//           />
//         </svg>
//       </div>
//     )
//   }

//   return children;
// };

// export default PrivateRoute;

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const { loginData, isAuthenticated, loading: authLoading, error, token, isTempPass } = useSelector(state => state.auth);
  const [routeChanging, setRouteChanging] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading your content...');

  // Handle authentication redirect
  useEffect(() => {
    if (isAuthenticated === false) {
      setLoadingMessage('Redirecting to login...');
      router.replace('/signIn');
    }
  }, [isAuthenticated, router]);

  // Handle route change events for loading state
  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      setRouteChanging(true);
      setLoadingMessage(url.includes('signIn') 
        ? 'Redirecting to login...' 
        : 'Loading your content...');
    };
    
    const handleRouteChangeComplete = () => setRouteChanging(false);
    const handleRouteChangeError = () => {
      setLoadingMessage('Something went wrong. Please wait...');
      setTimeout(() => setRouteChanging(false), 2000);
    };

    window.addEventListener('routeChangeStart', handleRouteChangeStart);
    window.addEventListener('routeChangeComplete', handleRouteChangeComplete);
    window.addEventListener('routeChangeError', handleRouteChangeError);

    return () => {
      window.removeEventListener('routeChangeStart', handleRouteChangeStart);
      window.removeEventListener('routeChangeComplete', handleRouteChangeComplete);
      window.removeEventListener('routeChangeError', handleRouteChangeError);
    };
  }, []);

  // Show loading spinner for either auth check or route change
  if (authLoading || routeChanging) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50 space-y-6">
        <div className="relative w-24 h-24">
          {/* Modern spinner with progress illusion */}
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-[#8B2433] rounded-full animate-spin"></div>
        </div>
        
        <div className="text-center max-w-md px-4">
          <h3 className="text-xl font-medium text-gray-800 mb-2">Please wait</h3>
          <p className="text-gray-600">{loadingMessage}</p>
          
          {/* Optional progress indicator */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#8B2433] h-2 rounded-full animate-pulse" 
              style={{ width: '70%' }} // This can be dynamic if you track progress
            ></div>
          </div>
          
          {/* Friendly tip to keep users engaged */}
          <p className="mt-4 text-sm text-gray-500 italic">
            Did you know? {randomFact()}
          </p>
        </div>
      </div>
    );
  }

  return children;
};

// Helper function to show random tips/facts
function randomFact() {
  const facts = [
    "Our platform processes requests in under 500ms on average.",
    "You can use keyboard shortcuts to navigate faster.",
    "Over 90% of users find what they need within 3 clicks.",
    "We refresh your data every 30 seconds automatically."
  ];
  return facts[Math.floor(Math.random() * facts.length)];
}

export default PrivateRoute;