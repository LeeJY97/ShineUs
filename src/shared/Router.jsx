import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Nav from "../components/Nav";
import MyFeed from "../pages/MyFeed";
import Join from "../pages/Join";
import MyPage from "../pages/MyPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nav" element={<Nav />} />
        <Route path="/myfeed" element={<MyFeed />} />
        <Route path="/join" element={<Join />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
