import styled from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";

// router
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";

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

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <StyledApp>
          <Router />
        </StyledApp>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
