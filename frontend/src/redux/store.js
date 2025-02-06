import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from "./authSlice"; // We'll create this next

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'], // Persist only the user slice, not the JWT token
  };

const persistedReducer = persistReducer(persistConfig, authSlice);

const store = configureStore({
  reducer: {
    auth: persistedReducer, // Adding the authentication reducer
  },
});

const persistor = persistStore(store);

export {store,persistor};
