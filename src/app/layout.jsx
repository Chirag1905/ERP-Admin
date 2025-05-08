'use client';

import "./globals.css";
import "@/assets/css/main.css";
import "@/assets/css/font.css";

import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/Redux/store';
import Loader from "@/components/utils/Loader";
import { useState } from "react";

// Prevent hydration warnings in console
if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = (...args) => {
    if (/hydration/i.test(args[0])) return;
    originalError.apply(console, args);
  };
}

export default function RootLayout({ children }) {
  const [rehydrated, setRehydrated] = useState(false);

  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/profile_av.png" type="image/png" />
      </head>
      <body data-swift-theme="blush">
        <Provider store={store}>
          <PersistGate
            persistor={persistor}
            loading={<Loader />}
            onBeforeLift={() => setRehydrated(true)}
          >
            <Toaster />
            {rehydrated ? children : null}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
