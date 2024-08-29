import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import MyFeed from "../pages/MyFeed";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myfeed" element={<MyFeed />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
