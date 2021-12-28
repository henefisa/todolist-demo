import * as React from "react";
import { Checkbox as ACheckbox, CheckboxProps } from "antd";
import styled from "styled-components";

const StyledCheckbox = styled(ACheckbox)``;

const Checkbox: React.FC<CheckboxProps> = (props) => {
  return <StyledCheckbox {...props} />;
};

export default React.memo(Checkbox);
