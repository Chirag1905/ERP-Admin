'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading, isTempPass } = useSelector(state => state.auth);
  const [loadingMessage, setLoadingMessage] = useState('Loading your content...');
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  // Public routes that don't require authentication
  const publicRoutes = ['/signIn', '/signUp', '/forgotPassword'];

  useEffect(() => {
    if (authLoading) return;

    // Redirect unauthenticated users trying to access protected routes
    if (!isAuthenticated && !publicRoutes.includes(currentPath)) {
      setLoadingMessage('Redirecting to login...');
      router.replace('/signIn');
      return;
    }

    // Allow access to /resetPassword only if the user is authenticated
    if (currentPath.includes('/resetPassword') && !isAuthenticated) {
      setLoadingMessage('Redirecting to login...');
      router.replace('/signIn');
      return;
    }

    // Redirect authenticated users with a temporary password to set a permanent password
    if (isAuthenticated && isTempPass && !currentPath.includes('/setPermanentPassword')) {
      setLoadingMessage('Redirecting to set your permanent password...');
      router.replace('/setPermanentPassword');
      return;
    }

    // Redirect authenticated users trying to access public routes
    if (isAuthenticated && publicRoutes.includes(currentPath) && !currentPath.includes('/resetPassword')) {
      setLoadingMessage('Redirecting to home...');
      router.replace('/');
      return;
    }
  }, [isAuthenticated, authLoading, isTempPass, router, currentPath]);
  // Show loading spinner during authentication check
  if (authLoading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50 space-y-6">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-[#8B2433] rounded-full animate-spin"></div>
        </div>
        <div className="text-center max-w-md px-4">
          <h3 className="text-xl font-medium text-gray-800 mb-2">Please wait</h3>
          <p className="text-gray-600">{loadingMessage}</p>
        </div>
      </div>
    );
  }

  // Render children if the user is allowed to access the route
  if (isAuthenticated || publicRoutes.includes(currentPath)) {
    return children;
  }

  return null;
};

export default PrivateRoute;