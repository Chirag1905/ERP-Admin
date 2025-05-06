'use client';
import "./globals.css";
import "@/assets/css/main.css"
import "@/assets/css/font.css"
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/Redux/store';
import Loader from "@/components/utils/Loader";

if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = (...args) => {
    if (/hydration/i.test(args[0])) return;
    originalError.apply(console, args);
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/default-favicon.ico" />
      </head>
      <body data-swift-theme="blush">
        <Provider store={store}>
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