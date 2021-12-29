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
    addTodo(state, action: PayloadAction<Todo>) {
      state.todos.push(action.payload);
    },
    removeTodo(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    editTodo(state, action: PayloadAction<Todo>) {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    },
    toggleTodoStatus(state, action: PayloadAction<string>) {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload ? { ...todo, status: !todo.status } : todo
      );
    },
    filterTodoStatus(state, action: PayloadAction<boolean | "ALL">) {
      state.filter = {
        ...state.filter,
        status: action.payload,
      };
    },
    setTodos(state, action: PayloadAction<Todo[]>) {
      state.todos = action.payload;
    },
  },
});

export const {
  addTodo,
  removeTodo,
  editTodo,
  toggleTodoStatus,
  filterTodoStatus,
  setTodos,
} = todoSlice.actions;
export default todoSlice.reducer;
