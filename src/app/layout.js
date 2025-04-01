"use client";
import React, { useState } from 'react';
import "./globals.css";
import "../assets/css/main.css"
import "../assets/css/font.css"
// import 'react-quill/dist/quill.snow.css';
import Header from '../components/partial/Header';
import Sidebar from '../components/partial/Sidebar';
import Footer from '../components/partial/Footer';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/Redux/store';

export default function RootLayout({ children }) {


  return (
    <html lang="en" data-theme="light">
      <body data-swift-theme="blush">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Toaster />
            {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}