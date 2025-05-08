'use client';

import "./globals.css";
import "@/assets/css/main.css";
import "@/assets/css/font.css";
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/Redux/store';
import Loader from "@/components/utils/Loader";
import { useEffect } from "react";
import Script from "next/script";

// Suppress hydration errors in the console
if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = (...args) => {
    if (typeof args[0] === 'string' && /hydration/i.test(args[0])) return;
    originalError.apply(console, args);
  };
}

export default function RootLayout({ children }) {

  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <Script src="/assets/lang-config.js" strategy="beforeInteractive" />
        <Script src="/assets/translation.js" strategy="beforeInteractive" />
        <Script src="//translate.google.com/translate_a/element.js?cb=TranslateInit" strategy="afterInteractive" />
      </head>
      <body data-swift-theme="blush">
      <div id="google_translate_element"></div>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={<Loader />}>
            <Toaster />
            {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}