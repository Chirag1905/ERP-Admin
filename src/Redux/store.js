import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

// Redux Persist Configuration
const persistConfig = {
  key: "root",
  storage,
};

// Create Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Saga Middleware
const sagaMiddleware = createSagaMiddleware();

// Create Store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }).concat(sagaMiddleware),
});

// Run Saga Middleware
sagaMiddleware.run(rootSaga);

// Create Persistor
const persistor = persistStore(store);

// Export store, persistor, and sagaMiddleware
export { store, persistor, sagaMiddleware };