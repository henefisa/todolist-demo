import * as React from "react";
import styled from "styled-components";

interface TodoBoxProps {
  children: React.ReactNode;
}

const StyledBox = styled.div`
  height: 500px;
  max-width: 400px;
  width: 100%;
  background: #fff;
  border-radius: 12px;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

const TodoBox: React.FC<TodoBoxProps> = ({ children }) => {
  return <StyledBox>{children}</StyledBox>;
};

export default React.memo(TodoBox);
