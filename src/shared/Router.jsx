import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import MyFeed from "../pages/MyFeed";
import MyPage from "../pages/MyPage";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";

import Layout from "../components/Layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="myfeed" element={<MyFeed />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
