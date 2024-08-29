import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "../pages/Join";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
