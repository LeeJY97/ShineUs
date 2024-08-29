import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import MyFeed from "../pages/MyFeed";
import MyPage from "../pages/MyPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myfeed" element={<MyFeed />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
