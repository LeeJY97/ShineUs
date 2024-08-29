import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Nav from "../components/Nav";
import MyFeed from "../pages/MyFeed";
import MyPage from "../pages/MyPage";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nav" element={<Nav />} />
        <Route path="/myfeed" element={<MyFeed />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
