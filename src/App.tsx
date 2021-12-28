import styled from "styled-components";

// views
import Todo from "./modules/Todo/Todo.view";

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

const App: React.FC = () => {
  return (
    <StyledApp>
      <Todo />
    </StyledApp>
  );
};

export default App;
