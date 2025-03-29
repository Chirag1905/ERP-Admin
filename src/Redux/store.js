import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

// const persistedReducer = persistReducer(persistConfig, rootReducer);
const persistedReducer = persistReducer(persistConfig, (state, action) => {
  // console.log('Redux Persist State:', state); // Debugging line
  return rootReducer(state, action);
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

// Debugging: Log the store state after rehydration
persistStore(store, null, () => {
  // console.log('Rehydrated State:', store.getState());
});

sagaMiddleware.run(rootSaga);
const persistor = persistStore(store);

export { store, persistor, sagaMiddleware };
