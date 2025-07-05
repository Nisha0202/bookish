import { configureStore } from "@reduxjs/toolkit";
import { api } from "../features/apiSlice";
import uiReducer from "../features/uiSlice";
import borrowFormReducer from "../features/borrowFormSlice";


import bookFormReducer from "../features/bookFormSlice";
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    
     ui: uiReducer,  bookForm: bookFormReducer,   borrowForm: borrowFormReducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;