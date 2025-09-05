import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/authSlice";
import schoolReducer from "../features/schoolSlice";
import teacherReducer from "../features/teacherSlice";
import studentReducer from "../features/studentSlice";
import superAdminReducer from "../features/superAdminSlice";
import accountantReducer from "../features/accountantSlice";
import timetableReducer from "../features/timetableSlice";
import classReducer from "../features/classSlice";
import sectionReducer from "../features/sectionSlice";
import parentReducer from "../features/parentSlice";

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
const persistedStudentReducer = persistReducer(persistConfig, studentReducer);
const persistedSuperAdminReducer = persistReducer(persistConfig, superAdminReducer);
const persistedAccountantReducer = persistReducer(persistConfig, accountantReducer);
const persistedTimetableReducer = persistReducer(persistConfig, timetableReducer);
const persistedClassReducer = persistReducer(persistConfig, classReducer);
const persistedSectionReducer = persistReducer(persistConfig, sectionReducer);
const persistedParentReducer = persistReducer(persistConfig, parentReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    school: persistedSchoolReducer,
    teacher: persistedTeacherReducer,
    student: persistedStudentReducer,
    superAdmin: persistedSuperAdminReducer,
    accountant: persistedAccountantReducer,
    timetable: persistedTimetableReducer,
    class: persistedClassReducer,
    section: persistedSectionReducer,
    parent: persistedParentReducer,
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
