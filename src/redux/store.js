import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import contactsReducer, { clearContacts } from "./contacts/slice";
import filtersReducer, { clearFilter } from "./filters/slice";
import authReducer from "./auth/slice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const logoutMiddleware = (store) => (next) => (action) => {
  if (action.type === "auth/logout/fulfilled") {
    store.dispatch(clearContacts());
    store.dispatch(clearFilter());
  }
  return next(action);
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    contacts: contactsReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logoutMiddleware),
});

export const persistor = persistStore(store);
