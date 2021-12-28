import * as React from "react";
import { InputProps, Input as AInput } from "antd";
import styled from "styled-components";

const StyledInput = styled(AInput)``;

const Input: React.FC<InputProps> = (props) => {
  return <StyledInput {...props} />;
};

export default React.memo(Input);
