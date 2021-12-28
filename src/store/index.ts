import { configureStore } from "@reduxjs/toolkit";

// reducers
import todoReducer from "./slices/todoSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
