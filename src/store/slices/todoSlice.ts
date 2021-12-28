import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../models/Todo";

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
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
  },
});

export const { add, remove, edit, toggleStatus } = todoSlice.actions;
export default todoSlice.reducer;
