// Redux store configuration
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import interviewReducer from "./slices/interviewSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    interview: interviewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["interview/generateReport/pending"],
      },
    }),
});

// Infer types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
