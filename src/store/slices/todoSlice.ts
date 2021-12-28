import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../models/Todo";

interface TodoState {
  todos: Todo[];
  filter: {
    status: boolean | "ALL";
  };
}

const initialState: TodoState = {
  todos: [],
  filter: {
    status: "ALL",
  },
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    add(state, action: PayloadAction<Todo>) {
      state.todos.push(action.payload);
    },
    remove(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    edit(state, action: PayloadAction<Todo>) {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    },
    toggleStatus(state, action: PayloadAction<string>) {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload ? { ...todo, status: !todo.status } : todo
      );
    },
    filterStatus(state, action: PayloadAction<boolean | "ALL">) {
      state.filter = {
        ...state.filter,
        status: action.payload,
      };
    },
  },
});

export const { add, remove, edit, toggleStatus, filterStatus } =
  todoSlice.actions;
export default todoSlice.reducer;