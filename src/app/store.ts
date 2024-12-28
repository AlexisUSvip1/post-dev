import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import postReducer from "../features/Post/postSlice";

export const store = configureStore({
  reducer: {
    user: userReducer, // User slice
    post: postReducer, // Post slice
  },
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>; // Type for the state
export type AppDispatch = typeof store.dispatch; // Type for dispatch