'use client';
import "./globals.css";
import "@/assets/css/main.css"
import "@/assets/css/font.css"
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/Redux/store';
import Loader from "@/components/utils/Loader";
import { useEffect, useState } from "react";

if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = (...args) => {
    if (/hydration/i.test(args[0])) return;
    originalError.apply(console, args);
  };
}

export default function RootLayout({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/default-favicon.ico" />
      </head>
      <body data-swift-theme="blush">
        <Provider store={store}>
          {isClient ? (
            <PersistGate
              persistor={persistor}
              loading={<Loader />}
            >
              <Toaster />
              {children}
            </PersistGate>
          ) : (
            <>
              <Toaster />
              {children}
            </>
          )}
        </Provider>
      </body>
    </html>
  );
}