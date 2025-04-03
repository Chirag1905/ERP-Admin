'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, loading } = useSelector(state => state.auth);
  console.log("🚀 ~ PrivateRoute ~ loading:", loading);

  useEffect(() => {
    // setTimeout(() => {
    //   setLoading(false);
    // }, 1000); // Simulating API/auth check delay

    if (!isAuthenticated) {
      router.replace('/signIn');
    }
  }, [isAuthenticated, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default PrivateRoute;
