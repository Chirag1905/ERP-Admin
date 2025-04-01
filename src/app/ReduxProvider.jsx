'use client';

import { store, persistor } from "../Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { signOutSuccess } from '../Redux/features/auth/authSlice';
import { useEffect } from 'react';

export default function ReduxProvider({ children }) {
  // Auto-logout function
  const setupAutoLogout = () => {
    const state = store.getState();
    const expiryTime = state.auth.expiryTime;

    if (expiryTime) {
      const currentTime = new Date().getTime();
      const timeUntilExpiry = expiryTime - currentTime;

      if (timeUntilExpiry > 0) {
        setTimeout(() => {
          store.dispatch(signOutSuccess());
        }, timeUntilExpiry);
      } else {
        store.dispatch(signOutSuccess());
      }
    }
  };

  useEffect(() => {
    // Initial check
    setupAutoLogout();
    
    // Subscribe to store changes
    const unsubscribe = store.subscribe(() => {
      setupAutoLogout();
    });

    return () => unsubscribe();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}