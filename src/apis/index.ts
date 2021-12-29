import axios, { AxiosResponse } from "axios";
import { Todo } from "../models/Todo";

export const API_END_POINT = "http://localhost:4000";

export const fetchTodos = (): Promise<AxiosResponse<Todo[]>> => {
  return axios.get(API_END_POINT + "/todos");
};

export const createTodo = (todo: Todo): Promise<AxiosResponse<Todo>> => {
  return axios.post(API_END_POINT + "/todos", todo);
};

export const deleteTodo = (id: string): Promise<AxiosResponse<{}>> => {
  return axios.delete(API_END_POINT + "/todos/" + id);
};

export const updateTodo = (todo: Todo): Promise<AxiosResponse<Todo>> => {
  return axios.patch(API_END_POINT + "/todos/" + todo.id, todo);
};
