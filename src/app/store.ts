import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/authSlice";
import schoolReducer from "../features/schoolSlice";
import teacherReducer from "../features/teacherSlice";

// Persist config ONLY for auth
const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "role"], // fields inside authSlice state you want to persist
};

// Wrap auth reducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedSchoolReducer = persistReducer(persistConfig, schoolReducer);
const persistedTeacherReducer = persistReducer(persistConfig, teacherReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    school: persistedSchoolReducer,
    teacher: persistedTeacherReducer,
    // 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist needs this
    }),
});

export const persistor = persistStore(store);

// Typed hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
