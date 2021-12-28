import { List } from "antd";
import styled from "styled-components";

export const TodoBox = styled.div`
  height: 500px;
  max-width: 400px;
  width: 100%;
  background: #fff;
  border-radius: 12px;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

export const TodoList = styled(({ isEmpty, ...rest }) => <List {...rest} />)<{
  isEmpty: boolean;
}>`
  overflow: auto;
  flex-grow: 1;
  ${({ isEmpty }) =>
    isEmpty &&
    `
    display: grid;
    place-items: center;`}
`;

export const TodoListItem = styled(List.Item)<{ status: boolean }>`
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

export const TodoDeleteButton = styled.button`
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
