import * as React from "react";
import { Button as AButton, ButtonProps } from "antd";
import styled from "styled-components";

const StyledButton = styled(AButton)``;

const Button: React.FC<ButtonProps> = (props) => {
  return <StyledButton {...props} />;
};

export default React.memo(Button);
