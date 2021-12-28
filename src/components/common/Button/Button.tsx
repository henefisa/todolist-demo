import * as React from "react";
import { Button as AButton } from "antd";
import styled from "styled-components";

const StyledButton = styled(AButton)``;

const Button: React.FC = () => {
  return <StyledButton />;
};

export default React.memo(Button);
