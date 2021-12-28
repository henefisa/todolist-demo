import * as React from "react";
import { Route, Routes } from "react-router-dom";

// views
import Todo from "../modules/Todo/Todo.view";
import Page404 from "../modules/404/404.view";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Todo />} />
      <Route path="*" element={<Page404 title="Page not found!" />} />
    </Routes>
  );
};

export default React.memo(Router);
