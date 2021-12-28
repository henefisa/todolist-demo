import * as React from "react";
import styled from "styled-components";
import { AnyAction } from "@reduxjs/toolkit";

// components
import { Collapse, Select } from "antd";

// store
import { RootState } from "../../store";
import { filterStatus } from "../../store/slices/todoSlice";
import { connect, ConnectedProps } from "react-redux";

const StyledCollapse = styled(Collapse)`
  & > .ant-collapse-item > .ant-collapse-header,
  & > .ant-collapse-item > .ant-collapse-content > .ant-collapse-content-box {
    padding: 10px 0;
  }
`;

const TodoFilter: React.FC<TodoFilterReduxProps> = ({
  filter,
  filterStatus,
}) => {
  return (
    <StyledCollapse ghost>
      <Collapse.Panel key="filter" header="Filter">
        <Select
          value={filter.status}
          onChange={(value) => {
            filterStatus(value);
          }}
          style={{ width: 200 }}
        >
          <Select.Option value="ALL">ALL</Select.Option>
          <Select.Option value={true}>Completed</Select.Option>
          <Select.Option value={false}>Inprogress</Select.Option>
        </Select>
      </Collapse.Panel>
    </StyledCollapse>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    filter: state.todos.filter,
  };
};
const mapDispatchToProps = (dispatch: React.Dispatch<AnyAction>) => {
  return {
    filterStatus: (status: boolean | "ALL") => dispatch(filterStatus(status)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type TodoFilterReduxProps = ConnectedProps<typeof connector>;

export default connector(React.memo(TodoFilter));
