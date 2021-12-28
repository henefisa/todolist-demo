import * as React from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { connect, ConnectedProps } from "react-redux";
import styled from "styled-components";

// components
import { DeleteOutlined } from "@ant-design/icons";
import { List, Typography } from "antd";
import CheckBox from "../common/CheckBox/CheckBox";

// store
import { RootState } from "../../store";
import { toggleStatus, remove } from "../../store/slices/todoSlice";

const StyledList = styled((props) => <List {...props} />)`
  overflow: auto;
  flex-grow: 1;
`;

const StyledListItem = styled(List.Item)<{ status: boolean }>`
  align-items: center;
  cursor: pointer;

  .ant-typography {
    margin-bottom: 0;
    margin-left: 10px;
    font-weight: 300;
    font-size: 14px;
    position: relative;
    transition: color 0.3s;
    ${({ status }) =>
      status &&
      `
    color: #bbb;
  `}
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%) scaleX(0);
      transform-origin: left;
      height: 1px;
      background: #333;
      width: 100%;
      transition: transform 0.3s;
      ${({ status }) =>
        status &&
        `
        transform: translateY(-50%) scaleX(1)
      `}
    }
  }
`;

const StyledDeleteButton = styled.button`
  cursor: pointer;
  background: none;
  color: #bbb;
  transition: color 0.3s;
  border: none;
  jusitfy-self: flex-end;
  &:hover {
    color: #ef4444;
  }
`;

const TodoList: React.FC<TodoListReduxProps> = ({
  todos,
  filter,
  toggleTodoStatus,
  removeTodo,
}) => {
  const filtered =
    filter.status === "ALL"
      ? todos
      : todos.filter((todo) => todo.status === filter.status);

  return (
    <StyledList>
      {filtered.map((todo) => (
        <StyledListItem key={todo.id} status={todo.status}>
          <CheckBox
            checked={todo.status}
            onClick={() => toggleTodoStatus(todo.id)}
          />
          <Typography.Title level={3} onClick={() => toggleTodoStatus(todo.id)}>
            {todo.content}
          </Typography.Title>
          <StyledDeleteButton onClick={() => removeTodo(todo.id)}>
            <DeleteOutlined />
          </StyledDeleteButton>
        </StyledListItem>
      ))}
    </StyledList>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    todos: state.todos.todos,
    filter: state.todos.filter,
  };
};

const mapDispatchToProps = (dispatch: React.Dispatch<AnyAction>) => {
  return {
    toggleTodoStatus: (id: string) => dispatch(toggleStatus(id)),
    removeTodo: (id: string) => dispatch(remove(id)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type TodoListReduxProps = ConnectedProps<typeof connector>;

export default connector(React.memo(TodoList));
