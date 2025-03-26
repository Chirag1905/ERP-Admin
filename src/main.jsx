import App from './App.jsx';
import { store, persistor } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import { signOutSuccess } from './Redux/features/auth/authSlice.js';

// Auto-logout function
const setupAutoLogout = () => {
  const state = store.getState();
  const expiryTime = state.auth.expiryTime;
  // console.log("🚀 ~ setupAutoLogout ~ expiryTime:", expiryTime)

  if (expiryTime) {
    const currentTime = new Date().getTime();
    const timeUntilExpiry = expiryTime - currentTime;

    if (timeUntilExpiry > 0) {
      setTimeout(() => {
        store.dispatch(signOutSuccess()); // Log out when the token expires
      }, timeUntilExpiry);
    } else {
      store.dispatch(signOutSuccess()); // Log out immediately if the token is already expired
    }
  }
};

// Check for auto-logout when the app starts
setupAutoLogout();

// Subscribe to store changes to re-run auto-logout logic when the expiry time changes
store.subscribe(() => {
  setupAutoLogout();
});

// Render the app
createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  // {/* </StrictMode>, */}
);