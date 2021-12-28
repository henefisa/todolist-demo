import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { connect, ConnectedProps } from "react-redux";
import { nanoid } from "nanoid";
import styled from "styled-components";

// components
import { Form } from "antd";
import TodoBox from "./components/TodoBox/TodoBox";
import TodoList from "./components/TodoList/TodoList";
import Input from "./components/common/Input/Input";
import Button from "./components/common/Button/Button";
import TodoFilter from "./components/TodoFilter/TodoFilter";

// store
import { add } from "./store/slices/todoSlice";

// model
import { Todo } from "./models/Todo";

// css
import "antd/dist/antd.min.css";

const StyledApp = styled.div`
  background: #4568dc;
  background: linear-gradient(60deg, #b06ab3, #4568dc);
  height: 100vh;
  display: grid;
  place-items: center;
  padding: 0 15px;
`;

interface FormValues {
  content: string;
}

const App: React.FC<AppProps> = ({ addTodo }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: FormValues) => {
    const todo: Todo = {
      id: nanoid(),
      content: values.content,
      status: false,
    };

    addTodo(todo);
    form.resetFields();
  };

  return (
    <StyledApp>
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
        <TodoFilter />
        <TodoList />
      </TodoBox>
    </StyledApp>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    addTodo: (todo: Todo) => dispatch(add(todo)),
  };
};

const connector = connect(null, mapDispatchToProps);

type AppProps = ConnectedProps<typeof connector>;

export default connector(App);
