'use client';
import "./globals.css";
import "@/assets/css/main.css"
import "@/assets/css/font.css"
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/Redux/store';
import Loader from "@/components/utils/Loader";
import { useEffect } from "react";
import { updateFavicon } from "@/components/utils/Favicon";
// import NextTopLoader from "nextjs-toploader";

// Suppress hydration warnings caused by browser extensions
if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = (...args) => {
    if (/hydration/i.test(args[0])) return;
    originalError.apply(console, args);
  };
}

export default function RootLayout({ children }) {
  useEffect(() => {
    // Check for school logo in localStorage
    const schoolLogo = localStorage.getItem('schoolLogo');

    if (schoolLogo) {
      updateFavicon(schoolLogo);
    } else {
      // Set default favicon if no logo exists
      updateFavicon('/default-favicon.ico');
    }
  }, []);
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        {/* Default favicon that will be replaced */}
        <link rel="icon" href="/default-favicon.ico" />
      </head>
      <body data-swift-theme="blush">
        <Provider store={store}>
          {/* <NextTopLoader
            color="#0000"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          /> */}
          <PersistGate
            persistor={persistor}
            loading={<Loader />}
          >
            <Toaster />
            {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}