import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";

// components
import { DeleteOutlined } from "@ant-design/icons";
import { Empty, Form, Select, Typography } from "antd";
import CheckBox from "../../components/CheckBox/CheckBox";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

// store
import { RootState } from "../../store";
import {
  addTodo,
  filterTodoStatus,
  removeTodo,
  toggleTodoStatus,
} from "../../store/slices/todoSlice";

// styles
import {
  TodoBox,
  TodoDeleteButton,
  TodoList,
  TodoListItem,
} from "./Todo.style";

// models
import { Todo as TodoModel } from "../../models/Todo";

interface FormValues {
  content: string;
}

const Todo: React.FC = () => {
  const [form] = Form.useForm();
  const { todos, filter } = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  const filtered =
    filter.status === "ALL"
      ? todos
      : todos.filter((todo) => todo.status === filter.status);

  const handleFinish = (values: FormValues) => {
    const todo: TodoModel = {
      id: nanoid(12),
      content: values.content,
      status: false,
    };

    dispatch(addTodo(todo));
    form.resetFields();
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
          <Button htmlType="submit">Add</Button>
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
      <TodoList>
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
              <TodoDeleteButton onClick={() => dispatch(removeTodo(todo.id))}>
                <DeleteOutlined />
              </TodoDeleteButton>
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
