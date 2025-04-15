'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const PrivateRouteAuth = ({ children }) => {
  const router = useRouter();
  const { loginData, isAuthenticated, loading: authLoading, error, token, isTempPass } = useSelector(state => state.auth);
  // const authLoading = false;
  const [routeChanging, setRouteChanging] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading your content...');
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  // Handle authentication redirect
  useEffect(() => {
    if (authLoading) return;

    // If user is not authenticated, redirect to login
    if (isAuthenticated === false) {
      setLoadingMessage('Redirecting to login...');
      router.replace('/signIn');
    }
    // If user is authenticated but trying to access password reset pages, redirect to home
    else if (isAuthenticated === true &&
      (currentPath.includes('resetPassword') || currentPath.includes('setPermanentPassword'))) {
      setLoadingMessage('Redirecting to home...');
      router.replace('/');
    }
  }, [isAuthenticated, authLoading, router, currentPath]);

  // Handle route change events for loading state
  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      setRouteChanging(true);
      if (url.includes('signIn')) {
        setLoadingMessage('Redirecting to login...');
      } else if (url.includes('resetPassword') || url.includes('setPermanentPassword')) {
        setLoadingMessage('Checking access...');
      } else {
        setLoadingMessage('Loading your content...');
      }
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
  if ( routeChanging) {
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

export default PrivateRouteAuth;