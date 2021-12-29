import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { useMutation, useQuery } from "react-query";
import { AxiosResponse } from "axios";

// components
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Empty, Form, Select, Space, Typography } from "antd";
import CheckBox from "../../components/CheckBox/CheckBox";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

// store
import { RootState } from "../../store";
import {
  addTodo,
  filterTodoStatus,
  removeTodo,
  setTodos,
  editTodo,
  toggleTodoStatus,
} from "../../store/slices/todoSlice";

// styles
import { TodoBox, TodoList, TodoListItem } from "./Todo.style";

// models
import { Todo as TodoModel } from "../../models/Todo";

// apis
import * as apis from "../../apis";

interface FormValues {
  content: string;
}

const Todo: React.FC = () => {
  const [form] = Form.useForm();
  const { todos, filter } = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();
  const [todo, setTodo] = React.useState<TodoModel | null>(null);

  const createTodo = useMutation(apis.createTodo, {
    onSuccess: (response) => {
      dispatch(addTodo(response.data));
    },
  });

  const deleteTodo = useMutation(apis.deleteTodo, {
    onSuccess: (_, id) => {
      dispatch(removeTodo(id));
    },
  });

  const updateTodo = useMutation(apis.updateTodo, {
    onSuccess: (response) => {
      dispatch(editTodo(response.data));
    },
  });

  const { data, isLoading, isError, error } = useQuery<
    AxiosResponse<TodoModel[]>,
    Error
  >("todos", apis.fetchTodos);

  React.useEffect(() => {
    if (!isLoading && data) {
      dispatch(setTodos(data.data));
    }
  }, [data, isLoading, dispatch]);

  React.useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);

  const filtered =
    filter.status === "ALL"
      ? todos
      : todos.filter((todo) => todo.status === filter.status);

  const handleFinish = (values: FormValues) => {
    if (todo) {
      const inputTodo: TodoModel = {
        ...todo,
        content: values.content,
      };
      updateTodo.mutate(inputTodo);
    } else {
      const inputTodo: TodoModel = {
        id: nanoid(12),
        content: values.content,
        status: false,
      };
      createTodo.mutate(inputTodo);
    }
    form.resetFields();
  };

  const handleDelete = async (id: string) => {
    deleteTodo.mutate(id);
  };

  return (
    <TodoBox>
      <Form
        layout="inline"
        onFinish={handleFinish}
        style={{ marginBottom: 10 }}
        form={form}
      >
        <Form.Item name="content" style={{ flexGrow: 1 }}>
          <Input placeholder="Add your todo here" />
        </Form.Item>
        <Form.Item style={{ marginRight: 0 }}>
          <Button htmlType="submit" disabled={createTodo.isLoading}>
            {todo ? "Save" : "Add"}
          </Button>
        </Form.Item>
      </Form>
      <Select
        value={filter.status}
        onChange={(value) => {
          dispatch(filterTodoStatus(value));
        }}
        style={{ width: 200 }}
      >
        <Select.Option value="ALL">ALL</Select.Option>
        <Select.Option value={true}>Completed</Select.Option>
        <Select.Option value={false}>Inprogress</Select.Option>
      </Select>
      <TodoList isEmpty={!filtered.length}>
        {filtered.length ? (
          filtered.map((todo) => (
            <TodoListItem key={todo.id} status={todo.status}>
              <CheckBox
                checked={todo.status}
                onClick={() => dispatch(toggleTodoStatus(todo.id))}
              />
              <Typography.Title
                level={3}
                onClick={() => dispatch(toggleTodoStatus(todo.id))}
              >
                {todo.content}
              </Typography.Title>
              <Space>
                <Button
                  type="link"
                  onClick={() => {
                    setTodo(todo);
                    form.setFieldsValue({ content: todo.content });
                  }}
                >
                  <EditOutlined />
                </Button>
                <Button
                  type="link"
                  danger
                  onClick={() => handleDelete(todo.id)}
                >
                  <DeleteOutlined />
                </Button>
              </Space>
            </TodoListItem>
          ))
        ) : (
          <Empty description="Your todo list is empty" />
        )}
      </TodoList>
    </TodoBox>
  );
};

export default React.memo(Todo);
