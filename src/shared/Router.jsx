import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Join from "../pages/Join";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
