import App from './App.jsx';
import { store, persistor } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";

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